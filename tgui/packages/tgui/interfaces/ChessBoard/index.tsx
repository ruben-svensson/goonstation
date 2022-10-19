declare const React;

import { Window } from '../../layouts';
import { Box, Button, Flex, Input, Knob, LabeledList } from '../../components';
import { classes } from 'common/react';

import { useBackend } from '../../backend';

import { fetchPieces } from './Pieces';

const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

type PieceIcon = {
  [key: string]: string;
};

type ChessBoardData = {
  pieceIcons: PieceIcon[];
};

export const ChessBoard = (_props, context) => {
  const { act, data } = useBackend<ChessBoardData>(context);

  let loc = window.location.pathname;
  let dir = loc.substring(0, loc.lastIndexOf('/'));
  return (
    <Window title={'Chess'} width={520} height={580}>
      <Window.Content fitted className="boardgame__window">
        <Box className="boardgame__panel" />
        <Flex className="boardgame__board">
          <Palette team={'Black'} />
          <CheckerBoard />
          <Palette team={'White'} />
        </Flex>
        <Box className="boardgame__panel" />
      </Window.Content>
    </Window>
  );
};

const CheckerBoard = (_props, context) => {
  const { act, data } = useBackend<ChessBoardData>(context);

  return (
    <Flex.Item grow={1} className="boardgame__checker">
      {
        // Loop 8x8
        Array.from(Array(BOARD_WIDTH * BOARD_HEIGHT).keys()).map((i) => {
          const x = i % BOARD_WIDTH;
          const y = Math.floor(i / BOARD_WIDTH);

          const isWhite = (x + y) % 2 === 0;
          const tileClass = isWhite ? 'boardgame__whitetile' : 'boardgame__blacktile';
          return <Box key={i} className={classes(['boardgame__checkertile', tileClass])} />;
        })
      }
    </Flex.Item>
  );
};

type PaletteProps = {
  team: string;
};

// A list of all the pieces that can be placed on the board

const Palette = ({ team }: PaletteProps, context) => {
  const { act, data } = useBackend<ChessBoardData>(context);
  const pieces = fetchPieces(team, 'Chess');
  return (
    <Flex.Item className="boardgame__palette">
      {
        // Fetch all the pieces for the team
        pieces.map((piece) => {
          return (
            <Box key={piece.name} className="boardgame__palettepiece">
              <img src={`${piece.image}`} />
            </Box>
          );
        })
      }
      <Box className="boardgame__palette-label-wrapper">
        <Box className="boardgame__palette-label">Palette</Box>
      </Box>
    </Flex.Item>
  );
};

const PalettePiece = (_props, context) => {
  const { act, data } = useBackend<ChessBoardData>(context);
  return <img src="" />;
};
