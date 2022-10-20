declare const React;

import { Window } from '../../layouts';
import { Box, Button, Flex, Input, Knob, LabeledList } from '../../components';
import { classes } from 'common/react';

import { useBackend } from '../../backend';

import { fetchPieces } from './Pieces';

type BoardgameData = {
  boardInfo: {
    name: string;
    game: string;
    width: number;
    height: number;
  };
  styling: {
    tileColour1: string;
    tileColour2: string;
  };
};

export const Boardgame = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { boardInfo, styling } = data;
  const { name } = boardInfo;
  const { tileColour1, tileColour2 } = styling;

  let loc = window.location.pathname;
  let dir = loc.substring(0, loc.lastIndexOf('/'));
  return (
    <Window title={name} width={520} height={580}>
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
  const { act, data } = useBackend<BoardgameData>(context);
  const { width, height } = data.boardInfo;

  return (
    <Flex.Item grow={1} className="boardgame__checker">
      {
        // Loop widthXheight
        Array.from(Array(width * height).keys()).map((i) => {
          const x = i % width;
          const y = Math.floor(i / width);

          const isWhite = (x + y) % 2 === 0;
          const tileClass = isWhite ? 'boardgame__whitetile' : 'boardgame__blacktile';

          const widthPercentage = 100 / width;
          const heightPercentage = 100 / height;

          return (
            <Box
              key={i}
              style={{
                'width': `${widthPercentage}%`,
                'height': `${heightPercentage}%`,
              }}
              className={classes(['boardgame__checkertile', tileClass])}
            />
          );
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
  const { act, data } = useBackend<BoardgameData>(context);
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
  const { act, data } = useBackend<BoardgameData>(context);
  return <img src="" />;
};
