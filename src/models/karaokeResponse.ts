export interface SongMetadata {
  songName: string | null;
  artist: string | null;
}

export interface ParsedLyricData {
  timestampMs: number;
  lyric: string;
  duration: number;
}

export interface LyricData extends ParsedLyricData {
  duration: number;
}

export interface KaraokeResponse extends SongMetadata {
  lyrics: LyricData[];
}
