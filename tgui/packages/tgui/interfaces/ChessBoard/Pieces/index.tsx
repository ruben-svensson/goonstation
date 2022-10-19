/* eslint-disable max-len */

import chessPieces from './chess';

export type Piece = {
  name: string;
  team: string;
  game: string;
  image: string;
};

const pieces: Piece[] = [];

pieces.push(...chessPieces);

export const getPieceByTeam = (team: string, game: string) => {
  return pieces.filter((piece) => piece.team === team && piece.game === game);
};

export const getPiecesByGame = (game: string) => {
  return pieces.filter((piece) => piece.game === game);
};

/**
 *
 * Returns all pieces, use params to filter by team and/or game
 *
 * @param team
 * @param game
 * @returns
 */

export const fetchPieces = (team?: string, game?: string) => {
  return pieces.filter((piece) => {
    if (team && game) {
      return piece.team === team && piece.game === game;
    } else if (team) {
      return piece.team === team;
    } else if (game) {
      return piece.game === game;
    } else {
      return true;
    }
  });
};
