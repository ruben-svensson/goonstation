declare const React;

import { Flex, Box } from '../../../components';
import { useBackend, useLocalState } from '../../../backend';
import { fenCodeRecordFromPieces, fetchPieces, getPiece, getPiecesByGame, PieceType } from '../Pieces';
import { BoardgameData, User } from '../types';
import { classes } from 'common/react';
import { Piece } from '../Components/Piece';
import { render } from 'inferno';

export type GhostPieceProps = {
  piece: PieceType;
  x: number;
  y: number;
};

export const GhostPiece = ({ piece, x, y }: GhostPieceProps) => {
  return (
    <Box
      className="boardgame__ghostpiece"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}>
      <img src={piece.image} />
    </Box>
  );
};

export const GhostPiecesContainer = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { users } = data;
  // Loop through every object in users
  if (users) {
    return (
      <Box>
        {users.length}
        {Object.keys(users).map((key) => {
          const user: User = users[key];
          const { selected } = user;
          if (selected) {
            const { code, game } = selected;
            const piece = getPiece(code, game);
            return <GhostPiece key={key} piece={piece} x={200} y={200} />;
          }
        })}
      </Box>
    );
  }
};

export const CheckerBoard = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { width, height, game } = data.boardInfo;
  const { currentUser } = data;
  const { board } = data;
  const { tileColour1, tileColour2 } = data.styling;

  const pieces = fetchPieces();
  const codes = fenCodeRecordFromPieces(pieces);

  const widthPercentage = 100 / width;
  const heightPercentage = 100 / height;

  const [flip, setFlip] = useLocalState(context, 'flip', false);

  return (
    <Flex.Item
      grow={1}
      className="boardgame__checker"
      style={{
        'border': `4px solid ${tileColour2}`,
      }}>
      {
        // Loop widthXheight
        Array.from(Array(width * height).keys()).map((i) => {
          const x = i % width;
          const y = Math.floor(i / width);

          const code = board[i];

          const isWhite = (x + y) % 2 === 0;
          const tileColour = isWhite ? tileColour1 : tileColour2;

          return (
            <Box
              key={i}
              onMouseUp={() => {
                act('pawnPlace', {
                  ckey: currentUser.ckey,
                  x: x,
                  y: y,
                });
                act('pawnDeselect', {
                  ckey: currentUser.ckey,
                });
              }}
              style={{
                'width': `${widthPercentage}%`,
                'height': `${heightPercentage}%`,
                'max-width': `${widthPercentage}%`,
                'max-height': `${heightPercentage}%`,
                'background-color': tileColour,
              }}
              className={classes(['boardgame__checkertile', flip ? 'boardgame__boardflip' : ''])}>
              {
                // If there is a piece on this tile, render it
                code !== '' && <Piece piece={codes[code]} position={{ x: x, y: y }} isSetPiece={false} />
              }
            </Box>
          );
        })
      }
    </Flex.Item>
  );
};
