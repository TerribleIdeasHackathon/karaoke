import { z } from 'zod';
import { Gamemode } from './gamemode';

const AntonymRequest = z.object({
  mode: z.literal(Gamemode.Antonym),
  songQuery: z.string(),
});

const ThemesRequest = z.object({
  mode: z.literal(Gamemode.Themes),
  songQuery: z.string(),
  theme: z.string(),
});

export const KaraokeRequest = ThemesRequest.or(AntonymRequest);

export type AntonymRequest = z.infer<typeof AntonymRequest>;
export type ThemesRequest = z.infer<typeof ThemesRequest>;
export type KaraokeRequest = z.infer<typeof KaraokeRequest>;
