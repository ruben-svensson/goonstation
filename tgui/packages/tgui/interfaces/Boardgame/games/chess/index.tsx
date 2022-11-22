import { GameKit, getPiecesByGame } from '..';
import pieces from './pieces';
import presets from './presets';

// Export as gamekit module, use type GameKit
export const kit: GameKit = {
  pieces,
  presets,
  sets: [
    {
      name: 'Chess',
      pieces,
    },
  ],
};

export default kit;
