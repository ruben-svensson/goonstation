import { useBackend } from '../backend';
import { Button, Flex } from '../components';
import { Window } from '../layouts';

const saxSounds = [
  'g3',
  'g-3',
  'a3',
  'a-3',
  'b3',
  'c4',
  'c-4',
  'd4',
  'd-4',
  'e4',
  'f4',
  'f-4',
  'g4',
  'g-4',
  'a4',
  'a-4',
  'b4',
  'c5',
  'c-5',
  'd5',
  'd-5',
  'e5',
  'f5',
  'f-5',
  'g5',
  'g-5',
  'a5',
  'a-5',
  'b5',
  'c6',
].reverse();

export const Jukebox = (props, context) => {
  const { act, data } = useBackend(context);

  return (
    <Window>
      <Window.Content>
        <PianoRollEditor />
      </Window.Content>
    </Window>
  );
};

const PianoRollEditor = (props, context) => {
  const { act, data } = useBackend(context);

  return (
    <Flex>
      <PianoRollKeyboard />
      <PianoRollBoard />
    </Flex>
  );
};

const PianoRollBoard = (props, context) => {
  const { act, data } = useBackend(context);
  return (
    <Flex direction={'column'} width={800}>
      <div style={{ height: '20px', width: '800px', background: '#1f2220' }} />
      <svg height={saxSounds.length * 20} width={800} style={{ background: '#4a504b' }} />
    </Flex>
  );
};

const PianoRollKeyboard = (props, context) => {
  const { act, data } = useBackend(context);

  return (
    <div>
      <Button style={{ height: '20px', width: '100%' }}>Play</Button>
      {saxSounds.map((note, index) => {
        return (
          <div
            onClick={() => {
              act('play_test', { song: `sound/musical_instruments/sax/notes/${note}.ogg` });
            }}
            className={note.includes('-') ? 'jukebox-key jukebox-key-black' : 'jukebox-key jukebox-key-white'}
            key={index}>
            {note}
          </div>
        );
      })}
    </div>
  );
};
