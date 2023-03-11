export interface LyricData {
  timestampMs: number;
  lyric: string;
}

export interface KaraokeResponse {
  lyrics: LyricData[];
  songName: string;
  artist: string;
}
