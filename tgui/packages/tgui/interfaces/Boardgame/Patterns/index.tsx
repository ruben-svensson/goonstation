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

const PatternToUse = ({ pattern }: PatternToUseProps, context) => {
  switch (pattern) {
    case 'checkerboard': // 4 tiles per square, handles translation
      return <CheckerBoard />;
    case 'go':
      return <Go />;
  }
};

export const Pattern = ({ pattern }: PatternProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { pieces, currentUser } = data;
  const { lock } = data.boardInfo;

  const { tileColour1, tileColour2 } = data.styling;
  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;

  const [tileSize, setTileSize] = useLocalState(context, 'tileSize', {
    width: 0,
    height: 0,
  });
  const [mouseCoords, setMouseCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'mouseCoords', { x: 0, y: 0 });

  const [translateCoords, setTranslateCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'translateCoords', { x: 0, y: 0 });

  const pieceRecords = fenCodeRecordFromPieces(fetchPieces());
  const [paletteSelected, setPaletteSelected] = useLocalState(context, 'paletteSelected', '');
  const [patternMulti, setPatternMulti] = useLocalState(context, 'patternMulti', 1);
  return (
    <svg
      onmousedown={(e) => {}}
      onmouseup={(e) => {
        const board = document.getElementById('pattern');
        const boardRect = board.getBoundingClientRect();

        const x = e.clientX; // Mouse x
        const y = e.clientY; // Mouse y

        const boardWidth = boardRect.width; // Full width of the board
        const boardHeight = boardRect.height; // Full height of the board

        const tileWidth = boardWidth / data.boardInfo.width; // Width of a single tile
        const tileHeight = boardHeight / data.boardInfo.height; // Height of a single tile

        // Convert the mouse coords to board coords
        // If the board is 8 tiles wide, and the mouse is at 50% of the board width, the board coord is 4
        // Use x,y, boardWidth, boardHeight, tileWidth, tileHeight only, boardRect.x and boardRect.y are not needed

        let patternMulti = 1; // Divide by this to get the board coord
        let patternOffset = 0; // Used to offset the board coord, for games like go
        switch (pattern) {
          case 'checkerboard': // 4 tiles per square, handles translation
            patternMulti = 4;
            break;
          case 'go':
            patternOffset = 0.5; // Half a tile
        }

        let boardX = x / tileWidth / patternMulti - 1 - patternOffset;
        let boardY = y / tileHeight / patternMulti - 1 - patternOffset;

        // Round the board coords to the nearest integer
        // if lock is true, round to the nearest integer

        if (lock) {
          boardX = Math.round(boardX);
          boardY = Math.round(boardY);
        }

        setTranslateCoords({
          x: boardX,
          y: boardY,
        });

        if (paletteSelected.length > 0) {
          if (currentUser.selected) {
            act('pawnPlace', {
              ckey: currentUser.ckey,
              x: boardX,
              y: boardY,
            });
          } else {
            act('pawnCreate', {
              fenCode: paletteSelected,
              x: boardX,
              y: boardY,
            });
          }
          setPaletteSelected('');
        }
      }}
      width="100%"
      height="100%">
      <PatternToUse pattern={pattern} />
      {Object.keys(pieces).map((val, index) => {
        const { x, y, code } = pieces[val];
        const pieceType = pieceRecords[code];

        // Is the piece selected by currentUser?
        const selected = pieces[val].selected;

        return (
          <svg
            className="boardgame__piecesvg"
            onmousedown={(e) => {
              // if the user has a piece selected, and this piece is not the selected piece, place the selected piece

              if (!selected) {
                act('pawnSelect', {
                  ckey: currentUser.ckey,
                  pId: val,
                });
                setPaletteSelected(code);
              }
            }}
            onmouseup={(e) => {
              setPaletteSelected('');

              // Deselect the pawn if it is itself
            }}
            ondblclick={(e) => {}}
            key={index}
            x={width * x + '%'}
            y={height * y + '%'}
            width={width + '%'}
            height={height + '%'}
            overflow="visible"
            viewBox="0 0 100 100"
            style={{
              'cursor': 'pointer',
            }}>
            <g overflow="visible">
              <image
                style={{
                  'cursor': 'pointer',
                  'opacity': selected ? 0.5 : 1,
                }}
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                xlinkHref={pieceType?.image}
              />
              {
                // if selected make it more opaque
                // center a text element with the holder's name
                // like a tooltip
                pieces[val].selected ? (
                  <svg overflow="visible">
                    <text
                      x="50%"
                      y="50%"
                      fontSize="18px"
                      text-anchor="middle"
                      dominant-baseline="middle"
                      style={{
                        'text-align': 'center',
                        'cursor': 'pointer',
                        'fill': 'black',
                        'font-weight': 'bold',
                        'stroke': 'white',
                        'stroke-width': '1px',
                      }}>
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
      })}
    </svg>
  );
};
