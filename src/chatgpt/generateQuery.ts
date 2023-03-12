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
    'Given a song, you will generate antonyms for every line. Make sure the result has the same number of lines as the original song.\n\n' +
    'The song:\n' +
    lyrics
  );
}
