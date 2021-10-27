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
    <Window theme="instrument" title={data.name} width={924} height={780}>
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
        <Button onClick={() => act('play_keyboard_on')}>Toggle keyboard support</Button>
        <div style={{ display: 'flex', 'justify-content': 'center' }}>
          <Keyboard activeKeys={activeKeys} />
        </div>
        <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
          <Button>Toggle piano roll view</Button>
          <div>
            <Button>Import</Button>
            <Button>Export</Button>
          </div>
        </div>
        <PianoRoll />
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

type PianoRollNote = {
  time: number;
  length: number;
  note: number;
};

type PianoRollNoteToPlay = {
  note: PianoRollNote;
  played: boolean;
};

const PianoRoll = (props, context) => {
  const { data } = useBackend<MusicInstrumentsData>(context);
  const { notes } = data;

  const [time, setTime] = useLocalState(context, 'pianoroll_time', 0);
  const [startTime, setStartTime] = useLocalState(context, 'pianoroll_starttime', 0);
  const [animationFrame, setAnimationFrame] = useLocalState(context, 'rollanimation', false);
  const [pianoRollNotes, setPianoRollNotes] = useLocalState<PianoRollNote[]>(context, 'pianorollnotes', []);
  const [playRoll, setPlayRoll] = useLocalState(context, 'playRoll', false);
  const [logMouseX, setLogMouseX] = useLocalState(context, 'logmousex', 0);

  const [notesToPlay, setNotesToPlay] = useLocalState<PianoRollNoteToPlay[]>(context, 'notestoplay', []);

  const animationStep = () => {
    if (playRoll) {
      setTime(time + 50);
      findNotesToPlay();
    } else {
      setTime(0);
      resetNotesToPlay();
    }
    if (time >= 8000) {
      setTime(0);
    }
    setAnimationFrame(false);
  };

  const findNotesToPlay = () => {
    if (notesToPlay.length > 0) {
      const newNotesToPlay = [...notesToPlay];
      newNotesToPlay.forEach((note, index) => {
        if (time > (note.note.time / 4) * 1000) {
          if (!newNotesToPlay[index].played) {
            playNote(note.note.note, context);
            newNotesToPlay[index].played = true;
          }
        }
      });

      setNotesToPlay(newNotesToPlay);
    }
  };
  const resetNotesToPlay = () => {
    setNotesToPlay(
      pianoRollNotes.map((note) => {
        const noteToPlay: PianoRollNoteToPlay = {
          note: note,
          played: false,
        };
        return noteToPlay;
      })
    );
  };

  const play = () => {
    setPlayRoll(!playRoll);
    resetNotesToPlay();
  };

  if (!animationFrame && playRoll) {
    setAnimationFrame(true);
    window.requestAnimationFrame(animationStep);
  }

  let nums = [];
  for (let i = 0; i < 8; i++) {
    nums.push(i);
    nums.push(0.25);
    nums.push(0.5);
    nums.push(0.75);
  }

  return (
    <div className="instrument__pianoroll-wrapper">
      <h5>Notes to play: {notesToPlay.length}</h5>
      <div className="instrument__pianoroll-board-toprow">
        <div className="instrument__pianoroll-board-controls">
          <Button
            onClick={() => {
              play();
              resetNotesToPlay();
            }}>
            Play
          </Button>
          <h5>
            {time - Math.round(time / 1000)}:{Math.round(time / 1000)}:{Math.round(time / 60 / 1000)}
          </h5>
        </div>
        <div
          className="instrument__pianoroll-board-timerow"
          onMouseDown={(ev) => {
            const left = ev.clientX - ev.currentTarget.offsetLeft;
            setTime(left * 10);
            resetNotesToPlay();
          }}>
          {nums.map((num: number, index) => (
            <span style={{ 'font-size': num.toString().includes('.') ? '7px' : '10px' }} key={index}>
              {' '}
              {num}
            </span>
          ))}
        </div>
      </div>
      <div className="instrument__pianoroll">
        <ul className="instrument__pianoroll-side">
          {notes &&
            notes.map((note, index) => (
              <li
                key={index}
                className={`instrument__pianoroll-sidenote ${
                  note.includes('-') && 'instrument__pianoroll-sidenote-blackblock'
                }`}>
                {note.replace('-', '#')}
              </li>
            ))}
        </ul>
        <div
          className="instrument__pianoroll-board"
          onClick={(ev) => {
            let mouseX = ev.clientX - ev.currentTarget.offsetLeft;
            let mouseY = ev.clientY - ev.currentTarget.offsetTop;
            mouseX = mouseX / 25;
            mouseY = mouseY / 20;
            setLogMouseX(mouseX);
            const newPianoRollNotes = pianoRollNotes;
            // newPianoRollNotes.find((note) => note.time === Math.round(mouseX) && )
            newPianoRollNotes.push({
              length: 0.25,
              note: Math.round(mouseY - 2),
              time: Math.round(mouseX),
            });
            setPianoRollNotes(newPianoRollNotes);
          }}>
          <div
            style={{ 'margin-left': `${((time - startTime) / 8000) * 100}%` }}
            className="instrument__pianoroll-board-marker"
          />
          <svg
            style={{ position: 'relative', top: '-100%' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 100% 100%`}>
            <g fill="red">
              {pianoRollNotes.map(({ length, note, time }, index) => (
                <rect key={index} x={time * 25} y={note * 20} width={length * 100} height="20" />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

/* export const MusicInstruments = (props, context) => {
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
/*
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
          {notes.map((note, index) => {
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
        <Button onClick={() => act('play_keyboard_on')}>Use keyboard</Button>
      </Window.Content>
    </Window>
  );
};*/

const playNote = (key: number, context) => {
  const { act } = useBackend<MusicInstrumentsData>(context);
  act('play_note', { note: key });
};
