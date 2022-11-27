import { classes } from 'common/react';
import { useBackend } from '../../../../../backend';
import { fenCodeRecordFromPieces, fetchPieces } from '../../../games';
import { useActions, useStates } from '../../../utils/config';
import { BoardgameData, PieceData } from '../../../utils/types';
import { screenToBoard } from './../helpers';

type GridPieceRendererProps = {
  pieces: PieceData[];
};

const GridPieceRenderer = ({ pieces }: GridPieceRendererProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { currentUser } = data;
  const { isFlipped, tileSize } = useStates(context);
  const { pieceSelect, pieceRemove, piecePlace } = useActions(act);

  const pieceRecords = fenCodeRecordFromPieces(fetchPieces());
  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;
  return (
    <svg width="100%" height="100%">
      {Object.keys(pieces).map((val, index) => {
        const { x, y, prevX, prevY, code, selected } = pieces[val];
        const pieceType = pieceRecords[code];

        // Is the piece selected by currentUser?
        const pieceSelected = selected && currentUser !== selected;

        // generate a unique color based on selected players name as a seed
        // make it so the same player always has the same color

        const flipY = data.boardInfo.height - y - 1;
        return (
          <svg
            className={classes(['boardgame__piecesvg'])}
            onmousedown={(e) => {
              // if the user has a piece selected, and this piece is not the selected piece, place the selected piece

              if (!selected) {
                pieceSelect(currentUser.ckey, val);
              }
            }}
            onmouseup={(e) => {
              const target = e.target as SVGRectElement;
              const bounds = target.getBoundingClientRect();
              const [xPos, yPos] = screenToBoard(bounds.left, bounds.top, tileSize);
              piecePlace(currentUser.ckey, xPos, yPos);
            }}
            ondblclick={(e) => {
              pieceRemove(pieces[val]);
            }}
            key={index}
            x={width * x + '%'}
            y={height * y + '%'}
            width={tileSize.width + 'px'}
            height={tileSize.height + 'px'}
            overflow="visible"
            style={{
              'opacity': pieceSelected ? 0.5 : 1,
            }}>
            <g
              transform={
                isFlipped
                  ? `rotate(180 ${tileSize.width / 2} ${tileSize.height / 2})`
                  : `rotate(0 ${tileSize.width / 2} ${tileSize.height / 2})`
              }
              width="100%"
              height="100%"
              overflow="visible">
              <image
                transform={isFlipped ? `rotate(180 50% 50%)` : ''}
                style={{
                  'cursor': 'pointer',
                }}
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                xlinkHref={pieceType?.image}
              />
            </g>
          </svg>
        );
      })}
    </svg>
  );
};

GridPieceRenderer.defaultHooks = {
  shouldComponentUpdate(nextProps: GridPieceRendererProps) {
    return nextProps.pieces !== this.props.pieces;
  },
};

export default GridPieceRenderer;
