import { generateQuery } from '@/chatgpt/generateQuery';
import { handleQuery as handleChatGptQuery } from '@/chatgpt/handleQuery';
import { generateSortedLrcFile, parseLrcLines } from '@/lrc/parseLrc';
import { searchForSongLyrics } from '@/lrc/scrapeLyrics';
import { ErrorResponse } from '@/models/errorResponse';
import { KaraokeResponse } from '@/models/karaokeResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import validate from '../../middleware/validate';
import { KaraokeRequest } from '../../models/karaokeRequest';

export default async function handler(req: NextApiRequest, res: NextApiResponse<KaraokeResponse | ErrorResponse>) {
  const body = await validate(req.body, KaraokeRequest, res);
  if (!body) return;

  const lrcLyrics = await searchForSongLyrics(body.songQuery);

  if (!lrcLyrics) {
    return res.status(404).json({ message: `We could not find any lyrics for the song query ${body.songQuery}` });
  }

  const sortedLyrics = generateSortedLrcFile(lrcLyrics);
  const chatGptQuery = generateQuery(body, sortedLyrics);

  // This will take a while...
  const lrcLines = await handleChatGptQuery(chatGptQuery);
  const lyricData = parseLrcLines(lrcLines);

  res.status(200).json({ lyrics: lyricData, songName: '', artist: '' });
}
