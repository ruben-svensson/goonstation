declare const React;

import { useBackend } from '../../../backend';
import { Flex } from '../../../components';
import { getPiecesByTeam, TeamType } from '../Pieces';
import { BoardgameData } from '../types';
import { Piece } from './Piece';

export type PieceSetProps = {
  game: string;
  team: TeamType;
};

export const PieceSet = ({ game, team }: PieceSetProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { styling } = data;

  const pieces = getPiecesByTeam(team, game);

  return (
    <Flex className="boardgame__piece-set">
      {pieces.map((piece) => (
        <Flex.Item className="boardgame__piece-set__piece" key={piece.name}>
          <Piece piece={piece} isSetPiece />
        </Flex.Item>
      ))}
    </Flex>
  );
};
