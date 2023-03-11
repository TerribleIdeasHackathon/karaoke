import { handleQuery } from '@/chatgpt/handleQuery';
import { NextApiRequest, NextApiResponse } from 'next';
import validate from '../../middleware/validate';
import { KaraokeRequest } from '../../models/karaokeRequest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lines = await handleQuery('Generate me a bad song');

  // const body = await validate(req.body, KaraokeRequest, res);
  // if (!body) return;

  res.status(200).json({ lyrics: lines });
}
