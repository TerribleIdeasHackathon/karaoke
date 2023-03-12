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
  if (url) {
    const queryUrl = new URL(url);
    const youtubeId = queryUrl.searchParams.get('v');

    return res.status(200).json({ youtubeId });
  }

  res.status(404).json({ message: 'We couldnt find the music for that song' });
}
