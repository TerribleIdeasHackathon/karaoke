import { generateQuery } from '@/chatgpt/generateQuery';
import { handleQuery as handleChatGptQuery } from '@/chatgpt/handleQuery';
import { generateSortedLrcFile, generateLyricDurations } from '@/lrc/parseLrc';
import { searchForSongLyrics } from '@/lrc/scrapeLyrics';
import { ErrorResponse } from '@/models/errorResponse';
import { KaraokeResponse, ParsedLyricData } from '@/models/karaokeResponse';
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

  const lyricsWithoutTimestamps = sortedLyrics.map((lyric) => lyric.lyric).join('\n');

  console.log(lyricsWithoutTimestamps);

  const chatGptQuery = generateQuery(body, lyricsWithoutTimestamps);

  // console.log(chatGptQuery);

  const lrcLines: ParsedLyricData[] = [];

  // This will take a while...
  const mutatedLyrics = await handleChatGptQuery(chatGptQuery);
  for (let index = 0; index < Math.min(sortedLyrics.length, mutatedLyrics.length); index++) {
    const mutatedLyric = mutatedLyrics[index];
    const timestampMs = sortedLyrics[index].timestampMs;

    lrcLines.push({ timestampMs, lyric: mutatedLyric });
  }

  const lyricData = generateLyricDurations(lrcLines);

  res.status(200).json({ lyrics: lyricData, songName: '', artist: '' });
}
