import { ValuesOf } from '../types/utility';

export const Gamemode = {
  Antonym: 'antonym',
  Themes: 'themes',
} as const;

export type Gamemode = ValuesOf<typeof Gamemode>;
