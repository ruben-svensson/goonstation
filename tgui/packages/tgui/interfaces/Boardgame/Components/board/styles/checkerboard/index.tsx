import { useBackend } from '../../../../../../backend';
import { useActions, useStates } from '../../../../utils/config';
import { BoardgameData } from '../../../../utils/types';
import GridPieceRenderer from '../../common/GridPieceRenderer';
import CheckerBoardPattern from './CheckerBoardPattern';

export const CheckerBoard = (props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { pieces, currentUser } = data;
  const { tileSize } = useStates(context);
  const { width, height } = tileSize;
  const { piecePlace, pieceRemove } = useActions(act);

  const onPlace = (mx: number, my: number) => {
    let boardX = Math.floor(mx / width);
    let boardY = Math.floor(my / height);

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
      <CheckerBoardPattern />
      <GridPieceRenderer pieces={pieces} />
    </div>
  );
};

export default CheckerBoard;
