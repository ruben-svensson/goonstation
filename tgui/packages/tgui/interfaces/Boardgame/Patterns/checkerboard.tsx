declare const React;

import { Flex, Box } from '../../../components';
import { useBackend, useLocalState } from '../../../backend';
import { fenCodeRecordFromPieces, fetchPieces, getPiece, getPiecesByGame, PieceType } from '../Pieces';
import { BoardgameData, Piece, User } from '../types';
import { classes } from 'common/react';
import { render } from 'inferno';

// Draw the board using svg
export const CheckerBoard = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { pieces, currentUser } = data;
  const { lock } = data.boardInfo;

  const { tileColour1, tileColour2 } = data.styling;
  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;

  return (
    <svg width="100%" height="100%">
      <pattern id="pattern" x="0" y="0" width={width * 2 + '%'} height={height * 2 + '%'} patternUnits="userSpaceOnUse">
        <rect width={width + '%'} height={height + '%'} fill={tileColour1} />
        <rect x={width + '%'} y={height + '%'} width={width + '%'} height={height + '%'} fill={tileColour1} />
        <rect x={width + '%'} width={width + '%'} height={height + '%'} fill={tileColour2} />
        <rect y={height + '%'} width={width + '%'} height={height + '%'} fill={tileColour2} />
      </pattern>
      <rect width="100%" height="100%" fill="url(#pattern)" />
    </svg>
  );
};

type PieceSvgProps = {
  piece: Piece;
  pieceType: PieceType;
};

/* export const PieceSvg = ({ piece, pieceType }: PieceSvgProps, context) => {
  return (

  );
};*/

/* export const CheckerBoard = (_props, context) => {
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
*/
