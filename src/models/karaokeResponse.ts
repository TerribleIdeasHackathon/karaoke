export interface ParsedLyricData {
  timestampMs: number;
  lyric: string;
  duration: number;
}

export interface LyricData extends ParsedLyricData {
  duration: number;
}

export interface KaraokeResponse {
  lyrics: LyricData[];
  songName: string;
  artist: string;
}
