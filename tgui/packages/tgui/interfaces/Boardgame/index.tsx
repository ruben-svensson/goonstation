declare const React;

import { Window } from '../../layouts';
import { Box, Button, Dimmer, Flex } from '../../components';
import { useBackend, useLocalState } from '../../backend';
import { Pattern } from './Patterns';
import { BoardgameData } from './types';

import { adjustWindowSize } from './helpers';

import { FenCodeSettings, FloatingPiecesContainer, Notations, PieceSet } from './Components';

export const Boardgame = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { name, game, pattern, width, height } = data.boardInfo;
  const { currentUser } = data;

  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [flip, setFlip] = useLocalState(context, 'flip', false);

  return (
    <Window title={name} width={400} height={550}>
      {configModalOpen && (
        <Dimmer full className="boardgame__configmodal">
          <Box className="boardgame__settings">
            <Button onClick={() => setConfigModalOpen(false)}>Close</Button>
            <FenCodeSettings />
          </Box>
        </Dimmer>
      )}
      <Window.Content
        onFocusIn={() => {
          adjustWindowSize(width, height);
        }}
        onMouseMove={(e) => {
          adjustWindowSize(width, height);
          if (currentUser) {
            act('mouseMove', {
              ckey: currentUser,
              x: e.clientX,
              y: e.clientY,
            });
          }
        }}
        onMouseUp={() => {
          act('pawnDeselect', {
            ckey: currentUser,
          });
        }}
        fitted
        style={{
          'background-color': data.styling.tileColour1,
        }}
        className="boardgame__window">
        <FloatingPiecesContainer />
        <Box className="boardgame__debug">
          <Button.Checkbox checked={flip} onClick={() => setFlip(!flip)} />
        </Box>
        <Notations direction={'horizontal'} />
        <Flex className={`boardgame__board ${flip ? 'boardgame__boardflip' : ''}`}>
          <Notations direction={'vertical'} />
          <Pattern pattern={pattern} />
          <Notations direction={'vertical'} />
        </Flex>
        <Notations direction={'horizontal'} />

        <Flex className="boardgame__piece-set-wrapper">
          <Box>
            <Button icon={'cog'} className="boardgame__menubutton" onClick={() => setConfigModalOpen(true)} />
          </Box>
          <Flex.Item className="boardgame__piece-set-container" grow={1}>
            <PieceSet game={game} team={'Black'} />
            <PieceSet game={game} team={'White'} />
          </Flex.Item>
        </Flex>
      </Window.Content>
    </Window>
  );
};
