import { searchForSongVideo } from '@/youtube/scrapeVideo';
import { NextApiRequest, NextApiResponse } from 'next';
import validate from '../../middleware/validate';
import { KaraokeRequest } from '../../models/karaokeRequest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = await validate(req.body, KaraokeRequest, res);
  if (!body) return;

  const { songQuery } = body;

  const url = await searchForSongVideo(songQuery);
  if (url) {
    const idStartIndex = url.indexOf('v=') + 2;
    const idEndIndex = url.indexOf('&', idStartIndex) ?? url.length - 1;
    const youtubeId = url.substring(idStartIndex, idEndIndex);

    return res.status(200).json({ youtubeId });
  }

  res.status(404).json({ message: 'We couldnt find the music for that song' });
}
