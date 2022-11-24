declare const React;
import { useBackend, useLocalState } from '../../../../../backend';
import { fenCodeRecordFromPieces, PieceSetupType, fetchPieces } from '../../../games';
import { BoardgameData } from '../../../utils/types';
import { STATES } from '../../../utils/config';

export const CheckerBoard = (_props, context) => {
  const { data } = useBackend<BoardgameData>(context);
  const { tileColor1, tileColor2 } = data.styling;

  const [zoom, setZoom] = STATES(context).zoom;

  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;

  return (
    <svg width="100%" height="100%">
      <pattern id="pattern" x="0" y="0" width={width * 2 + '%'} height={height * 2 + '%'} patternUnits="userSpaceOnUse">
        <rect width={width + '%'} height={height + '%'} fill={tileColor1} />
        <rect x={width + '%'} y={height + '%'} width={width + '%'} height={height + '%'} fill={tileColor1} />
        <rect x={width + '%'} width={width + '%'} height={height + '%'} fill={tileColor2} />
        <rect y={height + '%'} width={width + '%'} height={height + '%'} fill={tileColor2} />
      </pattern>
      <rect width="100%" height="100%" fill="url(#pattern)" />
    </svg>
  );
};
