declare const React;

import { useBackend } from '../../../backend';
import { Flex } from '../../../components';
import { PieceType } from '../Pieces';
import { BoardgameData, User } from '../types';

export type FloatingPieceProps = {
  user: User;
  piece: PieceType;
  x: number;
  y: number;
};

export const FloatingPiece = ({ user, piece, x, y }: FloatingPieceProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  return (
    <Flex
      className="boardgame_floatingpiece"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}>
      <Flex.Item grow={1}>
        <img src={piece?.image} />
      </Flex.Item>
    </Flex>
  );
};
