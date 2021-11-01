import { Component } from 'inferno';
import { useBackend, useLocalState } from '../backend';
import { Button, Flex, LabeledList, Box } from '../components';
import { Window } from '../layouts';

type MusicInstrumentsData = {
  name: string;
  notes: string[];
};
const noteKeyOffset = 0;
const noteKeysOrder: string[] = 'zsxdcvgbhnjmq2w3er5t6y7ui9o0p'.split('');
export const MusicInstruments = (props, context) => {
  const { act, data } = useBackend<MusicInstrumentsData>(context);

  const [activeKeys, setActiveKeys] = useLocalState(context, 'keyboard-activekeys', new Array(100).fill(false));

  return (
    <Window theme="instrument" title={data.name} width={964} height={330}>
      <Window.Content
        onKeyUp={(ev) => {
          let index = noteKeyOffset + noteKeysOrder.findIndex((keyOrder) => keyOrder === ev.key);
          const newKeys = activeKeys;
          newKeys[index] = false;
          setActiveKeys(newKeys);
        }}
        onKeyDown={(ev) => {
          let index = noteKeyOffset + noteKeysOrder.findIndex((keyOrder) => keyOrder === ev.key);
          if (index > 0 && index < noteKeysOrder.length && !activeKeys[index]) {
            playNote(index + 1, context);
            const newKeys = activeKeys;
            newKeys[index] = true;
            setActiveKeys(newKeys);
          }
        }}>
        <div style={{ display: 'flex', 'justify-content': 'center' }}>
          <Keyboard activeKeys={activeKeys} />
        </div>
        <Button onClick={() => act('play_keyboard_on')}>Toggle keyboard support</Button>
      </Window.Content>
    </Window>
  );
};

type KeyboardProps = {
  activeKeys: boolean[];
};

const Keyboard = ({ activeKeys }: KeyboardProps, context) => {
  const { data } = useBackend<MusicInstrumentsData>(context);
  const { notes } = data;

  const keyOffset = 0;

  return (
    <ul className="instruments__piano">
      {notes &&
        notes.map((note, index) => {
          const keybind = noteKeysOrder[index + keyOffset];
          return <PianoNote key={index} index={index} isActive={activeKeys[index]} keybind={keybind} name={note} />;
        })}
    </ul>
  );
};

type PianoNoteProps = {
  index: number;
  name: string;
  keybind: string;
  isActive: boolean;
};

const PianoNote = ({ index, name, keybind, isActive }: PianoNoteProps, context) => {
  const { act } = useBackend<MusicInstrumentsData>(context);
  const keyClass = name.includes('-') ? 'instruments__piano-key-black' : 'instruments__piano-key-white';
  const isWhiteOffsetKey = ['d', 'e', 'g', 'a', 'b'].includes(name.split('')[0]);
  const isBlackKey = name.includes('-');
  const wko = isWhiteOffsetKey && !isBlackKey ? 'instruments__piano-kwo' : '';

  return (
    <li
      className={`instruments__piano-key ${keyClass} ${wko} ${
        isActive ? (isBlackKey ? 'instruments__piano-key-black-active' : 'instruments__piano-key-white-active') : ''
      }`}
      onClick={() => playNote(index + 1, context)}>
      <div className="instruments__notedetails">
        {keybind && <div className="instruments__notekey">{keybind}</div>}
        <div className="instruments__notename">{name.replace('-', '#')}</div>
      </div>
    </li>
  );
};

const playNote = (key: number, context) => {
  const { act } = useBackend<MusicInstrumentsData>(context);
  act('play_note', { note: key });
};
