export interface LyricData {
  timestampMs: number;
  lyric: string;
  duration: number;
}

export interface KaraokeResponse {
  lyrics: LyricData[];
  songName: string;
  artist: string;
}
