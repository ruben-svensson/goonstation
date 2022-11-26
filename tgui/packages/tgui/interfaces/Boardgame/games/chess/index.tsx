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
      pieces,
    },
  ],
  // Generate 10 fun facts about chess
  facts: ['The first chess set was made in 1470.'],
};

export default kit;
