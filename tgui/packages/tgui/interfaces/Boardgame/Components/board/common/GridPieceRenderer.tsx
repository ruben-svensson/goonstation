import { useBackend } from '../../../../../backend';
import { fenCodeRecordFromPieces, fetchPieces } from '../../../games';
import { useActions, useStates } from '../../../utils/config';
import { BoardgameData, PieceData } from '../../../utils/types';
import { Box } from '../../../../../components';

type GridPieceRendererProps = {
  pieces: PieceData[];
};

const GridPieceRenderer = ({ pieces }: GridPieceRendererProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { currentUser, lastMovedPiece } = data;
  const { isFlipped, tileSize } = useStates(context);
  const { pieceSelect, pieceRemove, piecePlace } = useActions(act);
  const { width, height } = data.boardInfo;

  const pieceRecords = fenCodeRecordFromPieces(fetchPieces());

  // Draw the pieces
  // Offset by 20px to left and top
  return (
    <Box>
      {Object.keys(pieces).map((val, index) => {
        const { x, y, prevX, prevY, code, selected } = pieces[val];
        const pieceType = pieceRecords[code];

        // Is the piece selected by currentUser?
        const pieceSelectedByUser = selected && currentUser !== selected;

        let left = x * tileSize.width;
        let top = y * tileSize.height;

        if (isFlipped) {
          // 1 is subtracted from the x and y values to account for the fact that
          // the board is 0 indexed, but the width and height are not.
          // aka 1-width, 1-height, not 0-width, 0-height
          left = (width - x - 1) * tileSize.width;
          top = (height - y - 1) * tileSize.height;
        }

        return (
          <div
            onmousedown={(e) => {
              if (!selected) {
                pieceSelect(currentUser.ckey, val);
              }
            }}
            onmouseup={(e) => {
              let mx = e.clientX - 20;
              let my = e.clientY - 54;
              let boardX = Math.floor(mx / tileSize.width);
              let boardY = Math.floor(my / tileSize.height);
              if (isFlipped) {
                // 1 is subtracted from the x and y values to account for the fact that
                // the board is 0 indexed, but the width and height are not.
                // aka 1-width, 1-height, not 0-width, 0-height
                boardX = width - boardX - 1;
                boardY = height - boardY - 1;
              }
              piecePlace(currentUser.ckey, boardX, boardY);
            }}
            ondblclick={(e) => {
              pieceRemove(pieces[val]);
            }}
            style={{
              position: 'absolute',
              left: left + 'px',
              top: top + 'px',
              width: tileSize.width + 'px',
              height: tileSize.height + 'px',
            }}
            key={index}>
            <img
              style={{
                width: tileSize.width + 'px',
                height: tileSize.width + 'px',
              }}
              src={pieceType.image}
            />
            <span
              // Center text bellow img
              style={{
                'position': 'absolute',
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%, -50%)',
                'font-size': '12px',
                'font-weight': 'bold',
                'text-shadow': '0 0 2px black',
              }}>
              {selected}
            </span>
          </div>
        );
      })}
    </Box>
  );
};

export default GridPieceRenderer;
