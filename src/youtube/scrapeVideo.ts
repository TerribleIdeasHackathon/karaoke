import type { GoogleResponse } from '@/models/googleResponse';
// @ts-ignore
// There are no types for this library
import google from 'google-it';

export async function searchForSongVideo(searchTerm: string): Promise<string | null> {
  const prefix = 'site:youtube.com';
  const officialStr = '(Official Music Video)';
  const query = `${prefix} ${officialStr} ${searchTerm} `;
  const results = (await google({ query })) as GoogleResponse;

  // check if the official music video is in the top 5 results
  const officialMusicVideo = results.slice(5).find((r) => r.title.includes(officialStr) && !r.link.includes('clip'));

  if (officialMusicVideo) return officialMusicVideo.link;

  return results[0].link;
}
