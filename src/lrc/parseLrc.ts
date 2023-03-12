import { LyricData, ParsedLyricData, SongMetadata } from '../models/karaokeResponse';

const TimestampRegex = /^((\[\d{2}:\d{2}\.\d{2}\])+).*$/g;

interface ParsedSongData extends SongMetadata {
  lyrics: ParsedLyricData[];
}

export function parseLrcLines(lines: string[]): LyricData[] {
  const parsedLyricData = lines.map((line) => {
    const startOfLyrics = line.indexOf(']') + 1;
    const timestamp = line.substring(0, startOfLyrics);
    const lyric = line.substring(startOfLyrics);

    return { timestampMs: timestampToMs(timestamp), lyric };
  });

  const resultingLyricData: LyricData[] = [];

  for (let index = 0; index < parsedLyricData.length; index++) {
    const lyricData = parsedLyricData[index];
    const numberOfWords = lyricData.lyric.split(' ').length;
    const guestimatedMaxDurationMs = numberOfWords * 500;

    const isLastLine = index === parsedLyricData.length - 1;

    let duration: number;
    if (!isLastLine) {
      const timestampDifferenceMs = Math.max(0, parsedLyricData[index + 1].timestampMs - lyricData.timestampMs);
      duration = Math.min(timestampDifferenceMs, guestimatedMaxDurationMs);
    } else {
      duration = guestimatedMaxDurationMs;
    }

    resultingLyricData.push({ ...lyricData, duration });
  }

  return resultingLyricData;
}

export function generateLyricDurations(parsedLyricData: ParsedLyricData[]): LyricData[] {
  const resultingLyricData: LyricData[] = [];

  for (let index = 0; index < parsedLyricData.length; index++) {
    const lyricData = parsedLyricData[index];
    const numberOfWords = lyricData.lyric.split(' ').length;
    const guestimatedMaxDurationMs = numberOfWords * 500;

    const isLastLine = index === parsedLyricData.length - 1;

    let duration: number;
    if (!isLastLine) {
      const timestampDifferenceMs = Math.max(0, parsedLyricData[index + 1].timestampMs - lyricData.timestampMs);
      duration = Math.min(timestampDifferenceMs, guestimatedMaxDurationMs);
    } else {
      duration = guestimatedMaxDurationMs;
    }

    resultingLyricData.push({ ...lyricData, duration });
  }

  return resultingLyricData;
}

export function parseSongData(originalLrcFile: string): ParsedSongData {
  const parsedLyrics = parseLines(originalLrcFile.split('\n'));
  const sortedLyrics = parsedLyrics.lyrics.sort((a, b) => a.timestampMs - b.timestampMs);

  return { ...parsedLyrics, lyrics: sortedLyrics };
}

export function parseLines(lines: string[]): ParsedSongData {
  let lyrics: ParsedLyricData[] = [];
  let artist: string | null = null;
  let songName: string | null = null;

  if (lines.length !== 0 && lines[0].toLowerCase().includes('antonym')) {
    // Sometime it responds with something along the lines of 'The antonym version is:'
    lines.splice(0, 1);
  }

  for (const line of lines) {
    // Check for song metadata
    if (line.startsWith('[ar:')) {
      artist = line.substring(4, line.length - 1);
      continue;
    } else if (line.startsWith('[ti:')) {
      songName = line.substring(4, line.length - 1);
      continue;
    }

    const matches = line.match(TimestampRegex);
    // Ignore non-timestamp lines (E.g. author, etc)
    if (!matches) continue;

    const endOfTimestamps = line.lastIndexOf(']');

    const timestampsSubstring = line.substring(0, endOfTimestamps + 1);
    const lyric = line.substring(endOfTimestamps + 1);

    if (ignoreLyric(lyric)) continue;

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

  // Make sure the first element is timestamped at 0ms
  if (lyrics.length === 0 || lyrics[0].timestampMs !== 0) {
    lyrics = [{ timestampMs: 0, lyric: '' }, ...lyrics];
  }

  return { lyrics, artist, songName };
}

function ignoreLyric(lyric: string): boolean {
  return lyric.length === 0;
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
