import { useBackend } from '../../../../../backend';
import { useActions, useStates } from '../../../utils/config';
import { BoardgameData } from '../../../utils/types';
import BoardPieceSvg from '../BoardPiece';
import Pattern from './Pattern';

export default class CheckerBoard extends Pattern {
  constructor(context) {
    super(context);
  }

  onPlace(mx: number, my: number) {
    const { data, act } = useBackend<BoardgameData>(this.context);
    const { tileSize } = useStates(this.context);
    const { width, height } = tileSize;
    const { piecePlace } = useActions(act);

    const currentUser = data.currentUser;

    let boardX = Math.floor(mx / width);
    let boardY = Math.floor(my / height);

    piecePlace(currentUser.ckey, boardX, boardY);
  }

  drawPieces() {
    return <BoardPieceSvg />;
  }

  render() {
    const { data, act } = useBackend<BoardgameData>(this.context);
    const { pieceRemove } = useActions(act);
    const { currentUser } = data;
    const { tileColor1, tileColor2 } = data.styling;
    const { isFlipped } = useStates(this.context);

    const width = 100 / data.boardInfo.width;
    const height = 100 / data.boardInfo.height;
    return (
      <svg
        style={{
          width: '100%',
          height: '100%',
        }}>
        <svg
          width="100%"
          height="100%"
          onClick={(e) => {
            if (e.button === 0) {
              const target = e.target as SVGRectElement;
              const bounds = target.getBoundingClientRect();
              this.onPlace(e.clientX - bounds.left, e.clientY - bounds.top);
            }
          }}
          onMouseUp={(e) => {
            if (e.button === 0) {
              const target = e.target as SVGRectElement;
              const bounds = target.getBoundingClientRect();
              this.onPlace(e.clientX - bounds.left, e.clientY - bounds.top);
            }
          }}
          onDblClick={(e) => {
            if (currentUser.selected) {
              pieceRemove(currentUser.selected);
            }
          }}>
          <pattern
            id="pattern"
            x="0"
            y="0"
            width={width * 2 + '%'}
            height={height * 2 + '%'}
            patternUnits="userSpaceOnUse">
            <rect width={width + '%'} height={height + '%'} fill={tileColor1} />
            <rect x={width + '%'} y={height + '%'} width={width + '%'} height={height + '%'} fill={tileColor1} />
            <rect x={width + '%'} width={width + '%'} height={height + '%'} fill={tileColor2} />
            <rect y={height + '%'} width={width + '%'} height={height + '%'} fill={tileColor2} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
        {this.drawPieces()}
      </svg>
    );
  }
}
