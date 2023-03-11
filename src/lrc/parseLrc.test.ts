import { describe, it, expect } from 'vitest';
import { msToTimestamp, parseLines, timestampToMs } from './parseLrc';

describe('Timestamp parsing', () => {
  it('Can parse the timestamp [01:23.10]', () => {
    const timestamp = '[01:23.10]';
    expect(timestampToMs(timestamp)).toBe(83100);
  });

  it('Can convert ms to a timestamp', () => {
    const ms = 900200;
    expect(msToTimestamp(ms)).toBe('[15:00.20]');
  });

  it('Parses the lines of which have the LRC format', () => {
    const lines = ['[00:33.24][00:55.32][01:35.92][01:57.93][02:27.43][02:49.58]I kissed a girl and I liked it'];
    const lyrics = parseLines(lines);

    console.log(lyrics);

    // TODO: Verify lyrics matches expected format
  });
});
