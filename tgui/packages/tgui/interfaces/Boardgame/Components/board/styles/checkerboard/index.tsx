import { useBackend } from '../../../../../../backend';
import { useActions, useStates } from '../../../../utils/config';
import { BoardgameData } from '../../../../utils/types';
import GridGuideRenderer from '../../common/GridGuideRenderer';
import GridPieceRenderer from '../../common/GridPieceRenderer';
import CheckerBoardPattern from './CheckerBoardPattern';
import ImageBoard from './ImageBoard';

export const CheckerBoard = (props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { pieces, currentUser } = data;
  const { tileSize, isFlipped } = useStates(context);
  const { width, height } = tileSize;
  const { piecePlace, pieceRemove } = useActions(act);

  const onPlace = (mx: number, my: number) => {
    let boardX = Math.floor(mx / width);
    let boardY = Math.floor(my / height);

    if (isFlipped) {
      // 1 is subtracted from the x and y values to account for the fact that
      // the board is 0 indexed, but the width and height are not.
      // aka 1-width, 1-height, not 0-width, 0-height
      boardX = data.boardInfo.width - boardX - 1;
      boardY = data.boardInfo.height - boardY - 1;
    }

    piecePlace(currentUser.ckey, boardX, boardY);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      onClick={(e) => {
        if (e.button === 0) {
          const target = e.target as SVGRectElement;
          const bounds = target.getBoundingClientRect();
          onPlace(e.clientX - bounds.left, e.clientY - bounds.top);
        }
      }}
      onMouseUp={(e) => {
        if (e.button === 0) {
          const target = e.target as SVGRectElement;
          const bounds = target.getBoundingClientRect();
          onPlace(e.clientX - bounds.left, e.clientY - bounds.top);
        }
      }}
      onDblClick={(e) => {
        if (currentUser.selected) {
          pieceRemove(currentUser.selected);
        }
      }}>
      <ImageBoard />
      <CheckerBoardPattern />
      <GridGuideRenderer />
      <GridPieceRenderer pieces={pieces} />
    </div>
  );
};

export default CheckerBoard;
