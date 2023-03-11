import { LyricData } from '../models/karaokeResponse';

const TimestampRegex = /^((\[\d{2}:\d{2}\.\d{2}\])+).*$/g;

export function generateSortedLrclines(lines: string[]): string[] {
  const parsedLyrics = parseLines(lines);

  const sortedLyrics = parsedLyrics
    .sort((a, b) => a.timestampMs - b.timestampMs)
    .map((data) => `${msToTimestamp(data.timestampMs)}${data.lyric}`);

  return sortedLyrics;
}

export function parseLines(lines: string[]): LyricData[] {
  const lyrics: LyricData[] = [];
  for (const line of lines) {
    const matches = line.match(TimestampRegex);
    // Ignore non-timestamp lines (E.g. author, etc)
    if (!matches) continue;

    const endOfTimestamps = line.lastIndexOf(']');

    const timestampsSubstring = line.substring(0, endOfTimestamps + 1);
    const lyric = line.substring(endOfTimestamps + 1);

    // We need to add the ending ']' back after splitting.
    const timestamps = timestampsSubstring
      .split(']')
      .filter((timestamp) => timestamp.length !== 0)
      .map((timestamp) => timestamp + ']');

    // Add each timestamp to the lyrics object
    for (const timestamp of timestamps) {
      const ms = timestampToMs(timestamp);
      lyrics.push({ timestampMs: ms, lyric });
    }
  }

  return lyrics;
}

/**
 * Given a timestamp in the format: [minutes:seconds] it gets converted to ms.
 * E.g: [00:30.20]. There will always be 2 decimal places for the seconds.
 *
 *
 * @param timestamp The timestamp to parse
 * @returns The timestamp in ms
 */
export function timestampToMs(timestamp: string): number {
  // Remove the surrounding [ ]
  timestamp = timestamp.substring(1, timestamp.length - 1);

  const dividerIndex = timestamp.indexOf(':');

  const minutes = Number.parseInt(timestamp.substring(0, dividerIndex));
  const seconds = Number.parseFloat(timestamp.substring(dividerIndex + 1));

  const ms = minutes * 60 * 1000 + seconds * 1000;
  return ms;
}

export function msToTimestamp(ms: number): string {
  const minutes = Math.floor(ms / (1000 * 60));
  const seconds = (ms - minutes * 1000 * 60) / 1000;

  return `[${minutes.toFixed(0).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}]`;
}
