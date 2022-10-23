declare const React;

import { Flex, Box } from '../../../components';
import { useBackend } from '../../../backend';
import { fenCodeRecordFromPieces, getPiecesByGame } from '../Pieces';
import { BoardgameData } from '../types';
import { classes } from 'common/react';
import { Piece } from '..';

export const CheckerBoard = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { width, height } = data.boardInfo;
  const { currentUser } = data;
  const { board } = data;
  const { tileColour1, tileColour2 } = data.styling;

  const pieces = getPiecesByGame('Chess');
  const codes = fenCodeRecordFromPieces(pieces);

  const widthPercentage = 100 / width;
  const heightPercentage = 100 / height;
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
                  ckey: currentUser,
                  x: x,
                  y: y,
                });
                act('pawnDeselect', {
                  ckey: currentUser,
                });
              }}
              style={{
                'width': `${widthPercentage}%`,
                'height': `${heightPercentage}%`,
                'max-width': `${widthPercentage}%`,
                'max-height': `${heightPercentage}%`,
                'background-color': tileColour,
              }}
              className={classes(['boardgame__checkertile'])}>
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
