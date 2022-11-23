declare const Byond, window;

import { useBackend } from '../../../backend';
import { BoardgameData } from './types';

export const adjustWindowSize = (context) => {
  const { data } = useBackend<BoardgameData>(context);
  const { aspectRatio } = data.styling;

  const PaletteSetPadding = 100; // Add 100 pixels to the width
  const titlebarHeightPadding = 32;
  let width = 500;
  let height = 400;
  // Fetch boardgame__wrapper element and get its width and height
  const wrapper = document.getElementsByClassName('boardgame__wrapper')[0];
  if (wrapper) {
    const wrapperRect = wrapper.getBoundingClientRect();
    let wrapperWidth = wrapperRect.width;
    let wrapperHeight = wrapperRect.height;

    // Return if the width and height are the same
    if (wrapperWidth === width && wrapperHeight === height) {
      return;
    }

    let shortestSide = wrapperWidth < wrapperHeight ? wrapperWidth : wrapperHeight;

    // Set the width and height to the shortest side
    width = shortestSide + PaletteSetPadding;
    height = shortestSide + titlebarHeightPadding;

    // Set the width and height to the aspect ratio
    if (aspectRatio) {
      width = shortestSide * aspectRatio + PaletteSetPadding;
      height = shortestSide + titlebarHeightPadding;
    }
  }

  Byond.winset(window.__windowId__, {
    size: `${width}x${height}`,
  });
};
