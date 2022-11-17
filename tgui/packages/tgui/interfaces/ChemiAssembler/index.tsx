declare const React;

import { Window } from '../../layouts';
import { useBackend, useLocalState } from '../../backend';
import { Button, Flex, Stack, TextArea } from '../../components';

import { CodeEditor } from './CodeEditor';

type ChemiAssemblerData = {
  raw_program: string;
  registers: {
    sx: number;
    tx: number;
    ax: number;
  };
  // Variables, var name as key and value as value
  variables: { [key: string]: number };
  program: string[];
  pointer: number;
  running: boolean;
};

const SIZE = {
  width: 600,
  height: 600,
};

export const ChemiAssembler = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);
  const [program, setProgram] = useLocalState(context, 'program', data.raw_program || '');

  return (
    <Window title="ChemiAssembler" width={SIZE.width} height={SIZE.height}>
      <Window.Content fitted className="chemiassembler__content">
        <CodeEditor />
      </Window.Content>
    </Window>
  );
};

export const Console = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);
  const [consoleOutput, setConsoleOutput] = useLocalState(context, 'consoleOutput', '');
};
