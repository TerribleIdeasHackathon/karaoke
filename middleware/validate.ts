import { NextApiResponse } from 'next';
import { ZodError, ZodSchema } from 'zod';

interface BadRequestData {
  message: string;
}

export default async function validate<T>(
  value: any,
  model: ZodSchema<T>,
  res: NextApiResponse<BadRequestData>,
): Promise<T | null> {
  try {
    const data = await model.parseAsync(value);
    return data;
  } catch (err) {
    if (err instanceof ZodError) {
      // Not a great response, but it's fine...
      res.status(400).json({ message: err.toString() });
    }
  }

  return null;
}
