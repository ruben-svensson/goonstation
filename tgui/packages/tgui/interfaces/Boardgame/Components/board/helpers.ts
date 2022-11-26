import { TileSizeData } from '../../utils/types';

export const screenToBoard = (screenX: number, screenY: number, tileSize: TileSizeData): [number, number] => {
  let boardX = Math.floor(screenX / tileSize.width);
  let boardY = Math.floor(screenY / tileSize.height);
  // alert(screenX + ' ' + screenY);

  return [boardX, boardY];
};
