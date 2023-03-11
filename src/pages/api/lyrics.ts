import { generateQuery } from '@/chatgpt/generateQuery';
import { handleQuery } from '@/chatgpt/handleQuery';
import { generateSortedLrcFile } from '@/lrc/parseLrc';
import { searchForSongLyrics } from '@/lrc/scrapeLyrics';
import { NextApiRequest, NextApiResponse } from 'next';
import validate from '../../middleware/validate';
import { KaraokeRequest } from '../../models/karaokeRequest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = await validate(req.body, KaraokeRequest, res);
  if (!body) return;

  const lrcLyrics = await searchForSongLyrics(body.songQuery);

  if (!lrcLyrics) {
    return res.status(404).json({ message: `We could not find any lyrics for the song query ${body.songQuery}` });
  }

  const sortedLyrics = generateSortedLrcFile(lrcLyrics);
  const chatGptQuery = generateQuery(body, sortedLyrics);

  const lines = await handleQuery(chatGptQuery);

  res.status(200).json({ lyrics: lines });
}
