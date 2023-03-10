import { ValuesOf } from '../types/utility';

const Gamemode = {
  Antonym: 'antonym',
  Themes: 'themes',
} as const;

export type Gamemode = ValuesOf<typeof Gamemode>;
export default Gamemode;
