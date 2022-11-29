import { useBackend } from '../../../../../backend';
import { useStates } from '../../../utils/config';
import { BoardgameData } from '../../../utils/types';

/**
 * Renders help overlay for the board
 */

const GridGuideRenderer = (props, context) => {
  const { data } = useBackend<BoardgameData>(context);
  const { mouseCoords, tileSize } = useStates(context);

  const mx = mouseCoords.x - 20;
  const my = mouseCoords.y - 54;

  const currentUser = data.currentUser;

  if (!currentUser) return null;
  if (!currentUser.selected) return null;

  const piece = data.pieces[currentUser.selected];
  if (!piece) return null;

  const px = piece.x * tileSize.width + tileSize.width / 2;
  const py = piece.y * tileSize.height + tileSize.height / 2;

  // Detect if the piece is to the left or right of the mouse
  // value is -tileSize.width if the piece is to the left of the mouse, if in between 0

  const xDiff = Math.abs(px - mx);
  const yDiff = Math.abs(py - my);

  const xDir = px - mx > 0 ? -tileSize.width : tileSize.width;
  const yDir = py - my > 0 ? -tileSize.height : tileSize.height;

  const graidentRotation = Math.atan2(py - my, px - mx) * (Math.PI / 180);

  // Mouse to grid
  const rectX = Math.floor(mx / tileSize.width) * tileSize.width + 5;
  const rectY = Math.floor(my / tileSize.height) * tileSize.height + 5;
  const rectWidth = tileSize.width - 10;
  const rectHeight = tileSize.height - 10;

  const rectCenterX = rectX + rectWidth / 2;
  const rectCenterY = rectY + rectHeight / 2;

  // Position where the arrow should point to, the tip should be at the center of the tile
  const arrowHeadX = rectCenterX;
  return (
    <svg
      style={{
        position: 'absolute',
        'pointer-events': 'none',
        top: 0,
        left: 0,
      }}
      width="100%"
      height="100%">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="18" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="orange" stroke="none" />
        </marker>
      </defs>
      <line
        x1={xDir + px}
        y1={yDir + py}
        x2={rectCenterX}
        y2={rectCenterY}
        stroke="orange"
        stroke-width="5"
        marker-end="url(#arrow)"
        transform={`rotate(${graidentRotation}, ${rectCenterX}, ${rectCenterY})`}
      />
      <rect x={rectX} y={rectY} width={rectWidth} height={rectHeight} fill="red" fill-opacity="0.4" />
      <rect
        x={px - tileSize.width / 2 + 5}
        y={py - tileSize.height / 2 + 5}
        // Remove 10 from edge
        width={rectWidth}
        height={rectHeight}
        fill="red"
        fill-opacity="0.4"
      />
    </svg>
  );
};

export default GridGuideRenderer;
