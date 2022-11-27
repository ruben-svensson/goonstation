import { useBackend } from '../../../../../backend';
import { fenCodeRecordFromPieces, fetchPieces } from '../../../games';
import { useActions, useStates } from '../../../utils/config';
import { BoardgameData, PieceData } from '../../../utils/types';
import { Box } from '../../../../../components';
import { screenToBoard } from '../helpers';

type GridPieceRendererProps = {
  pieces: PieceData[];
};

const GridPieceRenderer = ({ pieces }: GridPieceRendererProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { currentUser, lastMovedPiece } = data;
  const { isFlipped, tileSize } = useStates(context);
  const { pieceSelect, pieceRemove, piecePlace } = useActions(act);

  const pieceRecords = fenCodeRecordFromPieces(fetchPieces());
  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;

  // Draw the pieces
  // Offset by 20px to left and top
  return (
    <Box>
      {Object.keys(pieces).map((val, index) => {
        const { x, y, prevX, prevY, code, selected } = pieces[val];
        const pieceType = pieceRecords[code];

        // Is the piece selected by currentUser?
        const pieceSelected = selected && currentUser !== selected;

        const xDist = Math.abs(x - prevX);
        const yDist = Math.abs(y - prevY);

        const flipY = data.boardInfo.height - y - 1;
        return (
          <div
            onmousedown={(e) => {
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
            style={{
              position: 'absolute',
              left: x * tileSize.width + 'px',
              top: y * tileSize.width + 'px',
              width: tileSize.width + 'px',
              height: tileSize.width + 'px',
            }}
            key={index}>
            <img
              style={{
                width: tileSize.width + 'px',
                height: tileSize.width + 'px',
              }}
              src={pieceType.image}
            />
          </div>
        );
      })}
    </Box>
  );
};

export default GridPieceRenderer;
