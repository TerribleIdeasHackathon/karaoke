import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const completionRequestSettings: Omit<CreateCompletionRequest, 'prompt'> = {
  model: 'text-davinci-003',
  max_tokens: 2048,
  stream: true,
  temperature: 0.6,
  top_p: 1.0,
  frequency_penalty: 0.5,
  presence_penalty: 0.7,
};

export async function handleQuery(prompt: string): Promise<string[]> {
  const results: string[] = [];

  const completion = await openai.createCompletion(
    { ...completionRequestSettings, prompt },
    { responseType: 'stream' },
  );

  const stream = streamCompletion(completion.data);
  let result = await stream.next();

  while (!result.done) {
    const json = result.value;
    try {
      const parsed = JSON.parse(json);
      const { text } = parsed.choices[0];

      results.push(text);
    } catch (error) {
      console.error('Could not JSON parse stream message', json, error);
    }

    result = await stream.next();
  }

  console.log(results);

  const lines = results
    .join('')
    .replaceAll('\t', '')
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
