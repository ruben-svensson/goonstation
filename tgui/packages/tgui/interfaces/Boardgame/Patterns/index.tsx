import { useBackend, useLocalState } from '../../../backend';
import { fenCodeRecordFromPieces, fetchPieces } from '../Pieces';
import { BoardgameData } from '../types';
import { CheckerBoard } from './checkerboard';
import { Go } from './go';

export type BoardPattern = 'checkerboard' | 'hexagon' | 'go';

type PatternProps = {
  pattern: BoardPattern;
};

type PatternToUseProps = {
  pattern: string;
};

const PatternToUse = ({ pattern }: PatternToUseProps) => {
  switch (pattern) {
    case 'checkerboard':
      return <CheckerBoard />;
      break;
    case 'go':
      return <Go />;
      break;
  }
};

export const Pattern = ({ pattern }: PatternProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { pieces, currentUser } = data;
  const { lock } = data.boardInfo;

  const { tileColour1, tileColour2 } = data.styling;
  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;

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

  const pieceRecords = fenCodeRecordFromPieces(fetchPieces());
  const [paletteSelected, setPaletteSelected] = useLocalState(context, 'paletteSelected', '');

  return (
    <svg
      onmousedown={(e) => {}}
      onmouseup={(e) => {
        const x = e.clientX;
        const y = e.clientY;

        const board = document.getElementById('pattern');
        const boardRect = board.getBoundingClientRect();

        const boardTileWidth = boardRect.width / data.boardInfo.width;
        const boardTileHeight = boardRect.height / data.boardInfo.height;

        // Convert the mouse coords to board coords
        const boardX = Math.floor((x - boardRect.left) / boardTileWidth);
        const boardY = Math.floor((y - boardRect.top) / boardTileHeight);

        // const boardX = ((x - boardRect.left) / boardRect.width) * 2 - 0.5;
        // const boardY = ((y - boardRect.top) / boardRect.height) * 2 - 0.5;
        if (paletteSelected.length > 0) {
          act('pawnCreate', {
            fenCode: paletteSelected,
            x: lock ? Math.round(boardX) : boardX,
            y: lock ? Math.round(boardY) : boardY,
          });
          setPaletteSelected('');
        } else {
          setTileSize({
            width: boardTileWidth,
            height: boardTileHeight,
          });

          // convert from mouse coords to board coords minus offset for centering

          act('pawnPlace', {
            ckey: currentUser.ckey,
            x: lock ? Math.round(boardX) : boardX,
            y: lock ? Math.round(boardY) : boardY,
          });
        }
      }}
      width="100%"
      height="100%">
      {
        // Switch on pattern if 'checkerboard' or 'hexagon' or 'go'
      }
      <PatternToUse pattern={pattern} />
      {
        // Draw a 😊 emoji
        // Map through every piece in pieces by Object key
        Object.keys(pieces).map((val, index) => {
          const { x, y, code } = pieces[val];
          const pieceType = pieceRecords[code];

          // Is the piece selected by currentUser?
          const selectedByUser = currentUser?.name === pieces[val].selected?.name;

          return (
            <svg
              className="boardgame__piecesvg"
              onmousedown={(e) => {
                // if the user has a piece selected, and this piece is not the selected piece, place the selected piece

                act('pawnSelect', {
                  ckey: currentUser.ckey,
                  pId: val,
                });
              }}
              onmouseup={(e) => {
                // Deselect the pawn if it is itself
              }}
              ondblclick={(e) => {}}
              key={index}
              x={width * x + '%'}
              y={height * y + '%'}
              // x={currentUser.selected.code === pieces[val].code ? mouseCoords.x : width * x + '%'}
              // y={currentUser.selected.code === pieces[val].code ? mouseCoords.y : height * y + '%'}
              width={width + '%'}
              height={height + '%'}
              viewBox="0 0 100 100"
              style={{
                'cursor': 'pointer',
              }}>
              <g>
                <image x="0%" y="0%" width="100%" height="100%" xlinkHref={pieceType?.image} />
                <text y="50%" stroke="white" />
                {
                  // if selected, draw a red border
                  pieces[val].selected ? (
                    <svg
                      style={{
                        'overflow': 'visible',
                        'box-shadow': '0px -0px 10000px transparent',
                      }}>
                      <text y="50%" fontSize="24px">
                        {pieces[val].selected.name}
                      </text>
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
