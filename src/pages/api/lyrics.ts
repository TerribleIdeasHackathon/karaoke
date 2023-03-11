import { NextApiRequest, NextApiResponse } from 'next';
import validate from '../../middleware/validate';
import { KaraokeRequest } from '../../models/karaokeRequest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body, typeof req.body);
  const body = await validate(req.body, KaraokeRequest, res);
  if (!body) return;

  res.status(200).json({ name: 'Lyrics :D' });
}
