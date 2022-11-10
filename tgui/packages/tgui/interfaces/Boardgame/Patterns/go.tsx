declare const React;

import { Flex, Box } from '../../../components';
import { useBackend, useLocalState } from '../../../backend';
import { fenCodeRecordFromPieces, fetchPieces, getPiece, getPiecesByGame, PieceType } from '../Pieces';
import { BoardgameData, Piece, User } from '../types';
import { classes } from 'common/react';
import { render } from 'inferno';

// Draw the board using svg
export const Go = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { pieces, currentUser } = data;
  const { lock } = data.boardInfo;

  const { tileColour1, tileColour2 } = data.styling;
  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;

  return (
    <svg id="pattern" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#DCB35C" />
      <rect width="90" height="90" x="3" y="3" stroke="#000" stroke-width=".2" fill="none" />
      <path
        stroke="#000"
        stroke-width=".2"
        fill="none"
        d="m3,8h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90"
      />
      <path
        stroke="#000"
        stroke-width=".2"
        fill="none"
        d="m8,3v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90"
      />
      <path
        stroke="#000"
        stroke-width=".8"
        stroke-linecap="round"
        d="m18,78l0,0m30,0l0,0m30,0l0,0m0-30l0,0m-30,0l0,0m-30,0l0,0m0-30l0,0m30,0l0,0m30,0l0,0"
      />
    </svg>
  );
};
