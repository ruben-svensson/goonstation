import { GameKit } from '..';
import pieces from './pieces';
import presets from './presets';

// Export as gamekit module, use type GameKit

export const kit: GameKit = {
  pieces,
  presets,
  palettes: [
    {
      name: 'Draughts',
      minWidthPercentage: 25,
      pieces,
    },
  ],
};

export default kit;
