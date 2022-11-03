/* eslint-disable max-len */

import chessPieces from './chess';
import unicodePieces from './unicode';
import facesPieces from './faces';
import gifPieces from './gifs';

export type PieceType = {
  fenCode: string;
  name: string;
  game: string;
  image?: string;
};

const pieces: PieceType[] = [];

pieces.push(...chessPieces);
pieces.push(...unicodePieces);
pieces.push(...facesPieces);
pieces.push(...gifPieces);

export const getPiece = (fenCode: string, game: string) => {
  return pieces.find((piece) => piece.fenCode === fenCode && piece.game === game);
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

export const fetchPieces = () => pieces;
