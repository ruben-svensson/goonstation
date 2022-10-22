/* eslint-disable max-len */

import chessPieces from './chess';

export type TeamType = 'White' | 'Black';

export type PieceType = {
  fenCode: string;
  name: string;
  team: TeamType;
  game: string;
  image: string;
};

const pieces: PieceType[] = [];

pieces.push(...chessPieces);

export const getPieceByTeam = (team: string, game: string): PieceType[] => {
  return pieces.filter((piece) => piece.team === team && piece.game === game);
};

export const getPiecesByGame = (game: string): PieceType[] => {
  return pieces.filter((piece) => piece.game === game);
};

export const fenCodeRecordFromPieces = (pieces: PieceType[]): Record<string, PieceType> => {
  return pieces.reduce((map, piece) => {
    map[piece.fenCode] = piece;
    return map;
  }, {});
};

export const fetchPieces = (team?: string, game?: string): PieceType[] => {
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
