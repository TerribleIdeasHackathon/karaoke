import { z } from 'zod';
import { Gamemode } from './gamemode';

const AntonymRequest = z.object({
  mode: z.literal(Gamemode.Antonym),
  songName: z.string(),
});

const ThemesRequest = z.object({
  mode: z.literal(Gamemode.Themes),
  songName: z.string(),
  theme: z.string(),
});

export const KaraokeRequest = ThemesRequest.or(AntonymRequest);
