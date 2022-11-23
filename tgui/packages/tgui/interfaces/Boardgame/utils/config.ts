import { useBackend, useLocalState } from '../../../backend';
import { BoardgameData } from './types';

export const DEFAULT = {
  FLIP: false,
  ZOOM: 1,
  MOUSE_COORDS: { x: 0, y: 0 },
  CFG_MODAL_TAB_INDEX: 1,
  CFG_MODAL_OPEN: false,
};

export type xyType = {
  x: number;
  y: number;
};

export const STATES = (context) => {
  return {
    // Board game
    flip: useLocalState<boolean>(context, 'flip', DEFAULT.FLIP),
    zoom: useLocalState<number>(context, 'zoom', DEFAULT.ZOOM),
    mouseCoords: useLocalState<xyType>(context, 'mouseCoords', DEFAULT.MOUSE_COORDS),
    // Config Modal
    modalTabIndex: useLocalState<number>(context, 'modalTabIndex', DEFAULT.CFG_MODAL_TAB_INDEX),
    modalOpen: useLocalState<boolean>(context, 'modalOpen', DEFAULT.CFG_MODAL_OPEN),
  };
};

/**
 *
 * @param context
 * @returns an object with functions to update the state
 */
export const useStates = (context) => {
  const states = STATES(context);

  return {
    // Flips the board
    toggleFlip: () => {
      const [flip, setFlip] = states.flip;
      setFlip(!flip);
    },
    isFlipped: states.flip[0],
    openModal: () => {
      const [, setmodalOpen] = states.modalOpen;
      setmodalOpen(true);
    },
    closeModal: () => {
      const [, setmodalOpen] = states.modalOpen;
      setmodalOpen(false);
    },
    isModalOpen: states.modalOpen[0],
    setModalTabIndex: (index: number) => {
      const [, setModalTabIndex] = states.modalTabIndex;
      setModalTabIndex(index);
    },
    modalTabIndex: states.modalTabIndex[0],
  };
};

/**
 *
 * @param act
 * @returns an object with functions that use act to send data to the backend
 */
export const useActions = (act) => {
  const actions = {
    pawnCreate: (pawn: string, x: number, y: number) => {
      act('pawnCreate', { pawn, x, y });
    },
    pawnRemove: (pawn: string) => {
      act('pawnRemove', { pawn });
    },
    pawnRemoveHeld: () => {
      act('pawnRemoveHeld');
    },
    pawnSelect: (pawn: string) => {
      act('pawnSelect', { pawn });
    },
    pawnDeselect: () => {
      act('pawnDeselect');
    },
    pawnPlace: (pawn: string, x: number, y: number) => {
      act('pawnPlace', { pawn, x, y });
    },
    applyGNot: (gNot: string) => {
      act('applyGNot', { gNot });
    },
    paletteSet: (pawn: string) => {
      act('paletteSet', { pawn });
    },
    paletteClear: () => {
      act('paletteClear');
    },
  };

  return actions;
};
