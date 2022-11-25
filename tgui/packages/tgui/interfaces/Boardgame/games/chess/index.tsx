import { GameKit } from '..';
import pieces from './pieces';
import presets from './presets';

// Export as gamekit module, use type GameKit
export const kit: GameKit = {
  pieces,
  presets,
  palettes: [
    {
      name: 'Chess',
      minWidthPercentage: 15.625,
      pieces,
    },
  ],
};

export default kit;
