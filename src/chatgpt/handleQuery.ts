import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const completionRequestSettings: Omit<CreateCompletionRequest, 'prompt'> = {
  model: 'text-davinci-003',
  max_tokens: 300,
  stream: true,
  temperature: 0.6,
  top_p: 1.0,
  frequency_penalty: 0.5,
  presence_penalty: 0.7,
};

export async function handleQuery(prompt: string): Promise<string[]> {
  const lines: string[] = [];

  const completion = await openai.createCompletion(
    { ...completionRequestSettings, prompt },
    { responseType: 'stream' },
  );

  for await (const message of streamCompletion(completion.data)) {
    try {
      const parsed = JSON.parse(message);
      const { text } = parsed.choices[0];

      lines.push(text);
    } catch (error) {
      console.error('Could not JSON parse stream message', message, error);
    }
  }

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

try {
  const completion = await openai.createCompletion(
    {
      ...completionRequestSettings,
      prompt:
        "Write karaoke lyrics for only the chorus of 'I kissed a girl' by Katy Perry, where each phrase is an antonym of the real lyrics",
    },
    { responseType: 'stream' },
  );

  for await (const message of streamCompletion(completion.data)) {
    try {
      const parsed = JSON.parse(message);
      const { text } = parsed.choices[0];

      process.stdout.write(text);
    } catch (error) {
      console.error('Could not JSON parse stream message', message, error);
    }
  }

  process.stdout.write('\n');
} catch (error: any) {}