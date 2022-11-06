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

  const [boardSize, setBoardSize] = useLocalState(context, 'boardSize', {
    width: 250,
    height: 250,
  });

  const [tileSize, setTileSize] = useLocalState(context, 'tileSize', {
    width: 0,
    height: 0,
  });
  const [mouseCoords, setMouseCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'mouseCoords', { x: 0, y: 0 });
  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;

  const pieceRecords = fenCodeRecordFromPieces(fetchPieces());

  return (
    <svg
      onmousedown={(e) => {}}
      onmouseup={(e) => {
        const x = e.clientX;
        const y = e.clientY;

        const board = document.getElementById('pattern-checkerboard');
        const boardRect = board.getBoundingClientRect();

        const boardTileWidth = boardRect.width / 8;
        const boardTileHeight = boardRect.height / 8;

        setTileSize({
          width: boardTileWidth,
          height: boardTileHeight,
        });

        // convert from mouse coords to board coords minus offset for centering
        const boardX = ((x - boardRect.left) / boardRect.width) * 2 - 0.5;
        const boardY = ((y - boardRect.top) / boardRect.height) * 2 - 0.5;
        act('pawnPlace', {
          ckey: currentUser.ckey,
          x: lock ? Math.round(boardX) : boardX,
          y: lock ? Math.round(boardY) : boardY,
        });
      }}
      width="100%"
      height="100%">
      <pattern
        id="pattern-checkerboard"
        x="0"
        y="0"
        width={width * 2 + '%'}
        height={height * 2 + '%'}
        patternUnits="userSpaceOnUse">
        <rect width={width + '%'} height={height + '%'} fill={tileColour1} />
        <rect x={width + '%'} y={height + '%'} width={width + '%'} height={height + '%'} fill={tileColour1} />
        <rect x={width + '%'} width={width + '%'} height={height + '%'} fill={tileColour2} />
        <rect y={height + '%'} width={width + '%'} height={height + '%'} fill={tileColour2} />
      </pattern>
      <rect width="100%" height="100%" fill="url(#pattern-checkerboard)" />

      {
        // Draw a 😊 emoji
        // Map through every piece in pieces by Object key
        Object.keys(pieces).map((val, index) => {
          const { x, y, code } = pieces[val];
          const pieceType = pieceRecords[code];

          // Is the piece selected by currentUser?
          const selected = currentUser.selected?.code === code;

          return (
            <svg
              className="boardgame__piecesvg"
              onmousedown={(e) => {
                // if the user has a piece selected, and this piece is not the selected piece, place the selected piece
                if (currentUser.selected && currentUser.selected.code !== code) {
                } else {
                  act('pawnSelect', {
                    ckey: currentUser.ckey,
                    pId: val,
                  });
                }
              }}
              onmouseup={(e) => {
                // Deselect the pawn if it is itself
              }}
              ondblclick={(e) => {}}
              key={index}
              x={width * x + '%'}
              y={height * y + '%'}
              // x={currentUser.selected ? mouseCoords.x : width * x + '%'}
              // y={currentUser.selected ? mouseCoords.y : height * y + '%'}
              width={width + '%'}
              height={height + '%'}
              viewBox="0 0 100 100"
              style={{
                'opacity': pieces[val].selected ? 0.5 : 1,
              }}>
              <g>
                <image x="0%" y="0%" width="100%" height="100%" xlinkHref={pieceType?.image} />
                <text y="50%" stroke="white">
                  {val}
                </text>
                {
                  // if selected, draw a red border
                  pieces[val].selected ? (
                    <svg>
                      <text y="50%">{pieces[val].selected.name}</text>
                    </svg>
                  ) : (
                    ''
                  )
                }
              </g>
            </svg>
          );
        })

        /* pieces.map((piece, index) => {
          const { x, y, code } = piece;
          const pieceType = pieceRecords[code];
          return (
            <svg key={index} x={width * x + '%'} y={height * y + '%'} width={width + '%'} height={height + '%'}>
              <g transform="scale(1, 1)">
                <image x="0%" y="0%" width="100%" height="100%" xlinkHref={pieceType?.image} />
                <text>{piece}</text>
              </g>
            </svg>
          );
        })*/
      }
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
