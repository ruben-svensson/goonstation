declare const React;

import { Window } from '../../layouts';
import { Box, Flex } from '../../components';
import { classes } from 'common/react';
import { useBackend, useLocalState } from '../../backend';
import { fetchPieces, getPieceByTeam, TeamType } from './Pieces';
import { PieceType } from './Pieces';
import { Pattern } from './Patterns';

import { TileSize, BoardgameData } from './types';

const getFirstTileDimensions = () => {
  const firstTileRef = document.getElementsByClassName('boardgame__checkertile')[0];
  return {
    width: firstTileRef.clientWidth,
    height: firstTileRef.clientHeight,
  };
};

/**
 * Returns the smallest size, if equal, returns 0
 */
const getSmallestTileSize = (tile: TileSize) => {
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

type FloatingPieceType = {
  piece: PieceType;
  x: number;
  y: number;
};

export const Boardgame = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { boardInfo, styling } = data;
  const { name } = boardInfo;

  let loc = window.location.pathname;
  let dir = loc.substring(0, loc.lastIndexOf('/'));

  const getProperDimensions = () => {
    const firstTile = getFirstTileDimensions();
    const size = getSmallestTileSize(firstTile);

    if (size.width === 0 && size.height === 0) return;

    const additionalWidth = 48; // 48 is the width of the (notations + padding) * 2
    const additionalHeight = 200; // 190 is the height of the titlebar + (notations + padding) * 2 + piece set

    const desiredWidth = size.width * boardInfo.width + additionalWidth;
    const desiredHeight = size.height * boardInfo.height + additionalHeight;

    return {
      width: desiredWidth,
      height: desiredHeight,
    };
  };

  const adjustWindowSize = () => {
    const dimensions = getProperDimensions();

    if (!dimensions) return; // Dimensions already good if 0

    const { width, height } = dimensions;

    Byond.winset(window.__windowId__, {
      size: `${width}x${height}`,
    });
  };

  return (
    <Window title={'Test'} width={400} height={550}>
      <Window.Content
        onFocusIn={() => {
          adjustWindowSize();
        }}
        onMouseMove={(e) => {
          adjustWindowSize();
        }}
        fitted
        className="boardgame__window">
        <FloatingPiece />
        <Box className="boardgame__debug" />
        <Notations direction={'horizontal'} />
        <Flex className="boardgame__board">
          <Notations direction={'vertical'} />
          <Pattern pattern={boardInfo.pattern} />
          <Notations direction={'vertical'} />
        </Flex>
        <Notations direction={'horizontal'} />
        <Box className="boardgame__piece-set-container">
          <PieceSet game={'Chess'} team={'Black'} />
          <PieceSet game={'Chess'} team={'White'} />
        </Box>
      </Window.Content>
    </Window>
  );
};

const FloatingPiece = (props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  return <Box className="boardgame_floatingpiece" />;
};

// <PieceSet game={'Chess'} />
type PieceSetProps = {
  game: string;
  team: TeamType;
};

const PieceSet = ({ game, team }: PieceSetProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { styling } = data;
  const { tileColour1, tileColour2 } = styling;

  const pieces = getPieceByTeam(team, game);

  // convert so the fencode is the key and the piece is the value

  return (
    <Flex className="boardgame__piece-set">
      {pieces.map((piece) => (
        <Flex.Item className="boardgame__piece-set__piece" key={piece.name}>
          <Piece piece={piece} />
        </Flex.Item>
      ))}
    </Flex>
  );
};

type PieceProps = {
  piece: PieceType;
};

export const Piece = ({ piece }: PieceProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { name, game, image, team } = piece;
  return (
    <Box className="boardgame__piece">
      <img src={image} />
    </Box>
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
        'color': tileColour2,
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

// <Piece piece={pieces[(x + y) % (pieces.length - 1)]} />
type PaletteProps = {
  team: string;
};

// A list of all the pieces that can be placed on the board

const Palette = ({ team }: PaletteProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const pieces = fetchPieces(team, 'Chess');
  /* return (
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
  );*/
  return <Flex.Item className="boardgame__palette" />;
};

const PalettePiece = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  return <img src="" />;
};
