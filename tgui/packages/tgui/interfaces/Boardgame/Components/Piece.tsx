import { Box } from '../../../components';
import { classes } from 'common/react';
import { useBackend, useLocalState } from '../../../backend';
import { TileSize, BoardgameData, User, StartingPosition } from '../types';
import { PieceType } from '../Pieces';

export type PieceProps = {
  piece: PieceType;
  isSetPiece: boolean;
  position?: {
    x: number;
    y: number;
  };
};

export const Piece = ({ piece, isSetPiece, position }: PieceProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { currentUser, pieces } = data;
  const { fenCode, name, game, image } = piece;
  const { x, y } = position || { x: -1, y: -1 }; // Default to 0,0 if no position is provided

  return <Box className={`boardgame__piece`}>{image}</Box>;
};
