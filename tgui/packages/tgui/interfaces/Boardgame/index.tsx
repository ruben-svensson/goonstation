declare const React;

import { Window } from '../../layouts';
import { Box, Button, Flex, Input, Knob, LabeledList } from '../../components';
import { classes } from 'common/react';

import { useBackend } from '../../backend';

import { fetchPieces, getPieceByTeam, getPiecesByGame } from './Pieces';

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

  let loc = window.location.pathname;
  let dir = loc.substring(0, loc.lastIndexOf('/'));
  return (
    <Window title={name || 'No name'} width={520} height={580}>
      <Window.Content fitted className="boardgame__window">
        <Box className="boardgame__panel" />
        <Notations direction={'horizontal'} />
        <Flex className="boardgame__board">
          <Palette team={'Black'} />
          <Notations direction={'vertical'} />
          <CheckerBoard />
          <Notations direction={'vertical'} />
          <Palette team={'White'} />
        </Flex>
        <Notations direction={'horizontal'} />
        <Box className="boardgame__panel" />
      </Window.Content>
    </Window>
  );
};

type NotationsProps = {
  direction: 'vertical' | 'horizontal';
};

const Notations = ({ direction }: NotationsProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { boardInfo } = data;
  const { height, width } = boardInfo;
  const { tileColour1, tileColour2 } = data.styling;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const heightPercentage = 100 / height;
  const widthPercentage = 100 / width;
  // loop through the board width and create a box for each

  let notationDirectionClass = '';
  if (direction === 'vertical') {
    notationDirectionClass = 'boardgame__verticalnotations';
  } else {
    notationDirectionClass = 'boardgame__horizontalnotations';
  }

  return (
    <Flex.Item
      style={{
        'background-color': tileColour1,
      }}
      className={classes(['boardgame__notations', notationDirectionClass])}>
      {Array.from(Array(direction === 'vertical' ? height : width).keys()).map((i) => (
        <Box
          key={i}
          style={{
            'height': direction === 'vertical' ? `${heightPercentage}%` : 'auto',
            'font-size': `${widthPercentage * 0.12}rem`,
          }}>
          {direction === 'vertical' ? i + 1 : chars[i]}
        </Box>
      ))}
    </Flex.Item>
  );
};

const CheckerBoard = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { width, height } = data.boardInfo;
  const { tileColour1, tileColour2 } = data.styling;

  const pieces = getPiecesByGame('Chess');
  const widthPercentage = 100 / width;
  const heightPercentage = 100 / height;
  return (
    <Flex.Item
      grow={1}
      className="boardgame__checker"
      style={{
        'border': `4px solid ${tileColour2}`,
      }}>
      {
        // Loop widthXheight
        Array.from(Array(width * height).keys()).map((i) => {
          const x = i % width;
          const y = Math.floor(i / width);

          const isWhite = (x + y) % 2 === 0;
          const tileColour = isWhite ? tileColour1 : tileColour2;

          return (
            <Box
              key={i}
              style={{
                'width': `${widthPercentage}%`,
                'max-width': `${widthPercentage}%`,
                'height': `${heightPercentage}%`,
                'max-height': `${heightPercentage}%`,
                'background-color': tileColour,
              }}
              className={classes(['boardgame__checkertile'])}>
              <img src={pieces[(x + y) % (pieces.length - 1)].image} />
            </Box>
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
