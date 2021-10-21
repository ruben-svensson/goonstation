import { useBackend, useLocalState } from '../backend';
import { Button, Flex, LabeledList, Box } from '../components';
import { Window } from '../layouts';

type MusicInstrumentsData = {
  name: string;
  notes: string[];
};

const noteKeysOrder: string[] = 'zsxdcvgbhnjmq2w3er5t6y7ui'.split('');

export const MusicInstruments = (props, context) => {
  const { act, data } = useBackend<MusicInstrumentsData>(context);

  const { name, notes } = data;

  const [currentNote, setCurrentNote] = useLocalState(context, 'currentNote', '');
  const [keyboardConnected, setKeyboardConnected] = useLocalState(context, 'keyboardConnected', false);
  const [keyOrderOffset, setKeyOrderOffset] = useLocalState(context, 'keyOrderOffset', 0);

  return (
    <Window title={data.name} width={705} height={200}>
      <Window.Content
        onKeyDown={(ev) => {
          // ev.preventDefault();
          {
            let index = keyOrderOffset + 1 + noteKeysOrder.findIndex((keyOrder) => keyOrder === ev.key);
            if (index > 0) {
              playNote(index, context);
            }
          }
          return;
          /** if (keyboardConnected) {
            setKeyboardConnected(false);
          } else {
            window.addEventListener('keydown', (ev) => {
              ev.preventDefault();
              {
                let index = 1 + noteKeysOrder.findIndex((keyOrder) => keyOrder === ev.key);
                if (index > 0) {
                  playNote(index, context);
                }
              }
            });
            setKeyboardConnected(true);
          } */
        }}>
        <h2>{name}</h2>
        <ul
          style={{
            display: 'flex',
            direction: 'column',
            'list-style-type': 'none',
            padding: 0,
            margin: 0,
          }}>
          {notes &&
            notes.map((note, index) => {
              let keyOrderIndex = keyOrderOffset - index;
              const isBlack = note.includes('-');
              return (
                <li
                  key={note}
                  onClick={() => playNote(index + 1, context)}
                  style={{
                    width: '25px',
                    height: '60px',
                    padding: '4px',
                    'font-size': '10px',
                    background: isBlack ? 'black' : 'white',
                    color: isBlack ? 'white' : 'black',
                  }}>
                  <div>{note}</div>
                  <div>{noteKeysOrder[index]}</div>
                </li>
              );
            })}
        </ul>
        <Button onClick={(ev) => {}}>{keyboardConnected ? 'Disconnect keyboard' : 'Connect keyboard'}</Button>
        <h4>{currentNote}</h4>
        <Button onClick={() => setKeyOrderOffset(keyOrderOffset - 1)}>{'<'}</Button>
        <Button onClick={() => setKeyOrderOffset(keyOrderOffset + 1)}>{'>'}</Button>
      </Window.Content>
    </Window>
  );
};

const playNote = (key: number, context) => {
  const { act } = useBackend<MusicInstrumentsData>(context);
  act('play_note', { note: key });
};
