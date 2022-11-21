import { useLocalState } from '../../../backend';

export const DEFAULT = {
  FLIP: false,
  ZOOM: 1,
  MOUSE_COORDS: { x: 0, y: 0 },
  CFG_MODAL_TAB_INDEX: 1,
  CFG_MODAL_OPEN: false,
};

export const STATES = (context) => {
  return {
    // Board game
    flip: useLocalState<boolean>(context, 'flip', DEFAULT.FLIP),
    zoom: useLocalState<number>(context, 'zoom', DEFAULT.ZOOM),
    mouseCoords: useLocalState<{
      x: number;
      y: number;
    }>(context, 'mouseCoords', DEFAULT.MOUSE_COORDS),
    // Config Modal
    cfgModalTabIndex: useLocalState<number>(context, 'cfgModalTabIndex', DEFAULT.CFG_MODAL_TAB_INDEX),
    cfgModalOpen: useLocalState<boolean>(context, 'cfgModalOpen', DEFAULT.CFG_MODAL_OPEN),
  };
};

export const ACTS = (act) => {
  return {};
};
