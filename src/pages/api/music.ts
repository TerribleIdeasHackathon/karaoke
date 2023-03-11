import { searchForSongVideo } from '@/youtube/scrapeVideo';
import { NextApiRequest, NextApiResponse } from 'next';
import validate from '../../middleware/validate';
import { KaraokeRequest } from '../../models/karaokeRequest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = await validate(req.body, KaraokeRequest, res);
  if (!body) return;

  const { songQuery } = body;

  const url = await searchForSongVideo(songQuery);

  console.log(url);

  res.status(200).json({ url });
}
