import { Gamemode } from '@/models/gamemode';
import { KaraokeRequest } from '@/models/karaokeRequest';

export function generateQuery(request: KaraokeRequest, lyrics: string): string {
  if (request.mode === Gamemode.Antonym) {
    return generateAntonymQuery(lyrics);
  }

  // TODO: Generate theme query
  return '';
}

export function generateAntonymQuery(lyrics: string): string {
  return (
    'Context: Given an .lrc file, you will generate a file with the exact same timestamps, but modify the lyrics based on the request\n\n' +
    'Request: Generate karaoke lyrics using antonyms for each paragraph, a paragraph is a set of lines with no empty lines between them.\n\n' +
    '.lrc file:\n' +
    lyrics
  );
}
