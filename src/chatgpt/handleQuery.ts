import { Configuration, CreateChatCompletionRequest, CreateCompletionRequest, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const completionRequestSettings: Omit<CreateChatCompletionRequest, 'messages'> = {
  model: 'gpt-3.5-turbo',
  max_tokens: 2048,
  stream: true,
  temperature: 0.7,
};

export async function handleQuery(prompt: string): Promise<string[]> {
  const results: string[] = [];

  const completion = await openai.createChatCompletion(
    { ...completionRequestSettings, messages: [{ role: 'user', content: prompt }] },
    { responseType: 'stream' },
  );

  const stream = streamCompletion(completion.data);
  let result = await stream.next();

  while (!result.done) {
    const json = result.value;
    try {
      const parsed = JSON.parse(json);
      const response = parsed.choices[0].delta.content;

      results.push(response);
    } catch (error) {
      console.error('Could not JSON parse stream message', json, error);
    }

    result = await stream.next();
  }

  const lines = results
    .join('')
    // TODO: Verify if this is still necessary with the new model
    // Sometimes we just get a ton of tabs? I think they're meant to be a newline...?
    .replaceAll(/\t+/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length !== 0);

  return lines;
}

// https://2ality.com/2018/04/async-iter-nodejs.html#generator-%231%3A-from-chunks-to-lines
async function* chunksToLines(chunksAsync: any) {
  let previous = '';
  for await (const chunk of chunksAsync) {
    const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    previous += bufferChunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf('\n')) >= 0) {
      // line includes the EOL
      const line = previous.slice(0, eolIndex + 1).trimEnd();
      if (line === 'data: [DONE]') break;
      if (line.startsWith('data: ')) yield line;
      previous = previous.slice(eolIndex + 1);
    }
  }
}

async function* linesToMessages(linesAsync: any) {
  for await (const line of linesAsync) {
    const message = line.substring('data :'.length);

    yield message;
  }
}

async function* streamCompletion(data: any) {
  yield* linesToMessages(chunksToLines(data));
}
