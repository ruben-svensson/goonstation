import { getPiecesByGame, PieceType } from './pieces';

export type PieceSet = {
  name: string;
  pieces: PieceType[];
};

/**
 * A collection of sets to be used by the palette drawer
 */

export const sets: PieceSet[] = [];

sets.push({
  name: 'Chess',
  pieces: getPiecesByGame('chess'),
});

sets.push({
  name: 'Draughts',
  pieces: getPiecesByGame('draughts'),
});
