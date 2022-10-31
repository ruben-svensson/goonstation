import { TileSize } from './types';

export const getFirstTileDimensions = () => {
  const firstTileRef = document.getElementsByClassName('boardgame__checkertile')[0];
  return {
    width: firstTileRef.clientWidth,
    height: firstTileRef.clientHeight,
  };
};

/**
 * Returns the smallest size, if equal, returns 0
 */
export const getSmallestTileSize = (tile: TileSize) => {
  let dimensions: TileSize = {
    width: 0,
    height: 0,
  };

  if (tile.width > tile.height) {
    dimensions.height = tile.height;
    dimensions.width = tile.height;
  } else if (tile.width < tile.height) {
    dimensions.width = tile.width;
    dimensions.height = tile.width;
  }
  return dimensions;
};

export const getProperDimensions = (width: number, height: number) => {
  const firstTile = getFirstTileDimensions();
  const size = getSmallestTileSize(firstTile);

  if (size.width === 0 && size.height === 0) return;

  const additionalWidth = 48; // 48 is the width of the (notations + padding) * 2
  const additionalHeight = 200; // 190 is the height of the titlebar + (notations + padding) * 2 + piece set

  const desiredWidth = size.width * width + additionalWidth;
  const desiredHeight = size.height * height + additionalHeight;

  return {
    width: desiredWidth,
    height: desiredHeight,
  };
};

export const adjustWindowSize = (width: number, height: number) => {
  const dim = getProperDimensions(width, height);

  if (!dim) return; // Dimensions already good if 0

  Byond.winset(window.__windowId__, {
    size: `${dim.width}x${dim.height}`,
  });
};
