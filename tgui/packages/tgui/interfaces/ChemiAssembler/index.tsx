declare const React;

import { Window } from '../../layouts';
import { useBackend, useLocalState } from '../../backend';
import { Box, Button, Flex, Stack, TextArea } from '../../components';

import { CodeEditor } from './CodeEditor';

type Reservoir = {
  initial_volume: number;
};

export type User = {
  ckey: string;
  name: string;
};

export type ChemiAssemblerData = {
  raw_program: string;
  registers: {
    sx: number;
    tx: number;
    ax: number;
  };
  // Variables, var name as key and value as value
  variables: { [key: string]: number };
  reservoirs: Reservoir[];
  program: string[];
  pointer: number;
  running: boolean;
  active_user: User;
};

const SIZE = {
  width: 800,
  height: 600,
};

export const ChemiAssembler = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);
  const [program, setProgram] = useLocalState(context, 'program', data.raw_program || '');

  return (
    <Window title="ChemiAssembler" width={SIZE.width} height={SIZE.height}>
      <Window.Content fitted className="chemiassembler__wrapper">
        <Box className="chemiassembler__window" />
        <Box className="chemiassembler__content">
          <Box className="chemiassembler__content-left">
            <Controls />
            <LineSeperator direction={'horizontal'} />
            <CodeEditor />
            <LineSeperator direction={'horizontal'} />
            <Console />
          </Box>
          <LineSeperator direction={'vertical'} />
          <Information />
        </Box>
      </Window.Content>
    </Window>
  );
};

const Information = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);

  return (
    <Box className="chemiassembler__content-right">
      <Flex direction={'column'}>
        <h3>Registers</h3>
        {Object.keys(data.registers).map((register) => {
          return (
            <Flex.Item className="chemiassembler__content-right-register" key={register}>
              <Box className="chemiassembler__content-right-register-name">{register}</Box>
              <Box className="chemiassembler__content-right-register-value">{data.registers[register]}</Box>
            </Flex.Item>
          );
        })}
      </Flex>
      <LineSeperator direction={'horizontal'} />
      <Flex
        style={{
          'flex-direction': 'column',
          'flex-grow': 1,
        }}>
        <Flex.Item>
          <h3>Variables</h3>
        </Flex.Item>
        {Object.keys(data.variables).map((variable, i) => {
          return (
            <Flex.Item className="chemiassembler__content-right-variable" key={variable}>
              <Box className="chemiassembler__content-right-variable-name">{variable}: </Box>
              <Box className="chemiassembler__content-right-variable-value">{data.variables[variable]}</Box>
            </Flex.Item>
          );
        })}
      </Flex>
      <LineSeperator direction={'horizontal'} />
      <Flex direction={'column'}>
        <Flex.Item>
          <h3>Reservoirs</h3>
        </Flex.Item>
        <Flex.Item grow>
          <Flex className="chemiassembler__content-right-reservoirs">
            {data.reservoirs.map((reservoir, i) => {
              return <ReservoirTank key={i} index={i} />;
            })}
          </Flex>
        </Flex.Item>
      </Flex>
      <LineSeperator direction={'horizontal'} />
      <Flex direction={'column'}>
        <Flex.Item>
          <h3>Runtime Info</h3>
        </Flex.Item>
        <Flex.Item className="chemiassembler__content-right-pointer">
          <Box className="chemiassembler__content-right-pointer-name">Pointer: </Box>
          <Box className="chemiassembler__content-right-pointer-value">{data.pointer}</Box>
        </Flex.Item>
        <Flex.Item className="chemiassembler__content-right-program">
          <Box className="chemiassembler__content-right-program-name">Program: </Box>
          <Box className="chemiassembler__content-right-program-value">{data.program[data.pointer]}</Box>
        </Flex.Item>
        <Flex.Item className="chemiassembler__content-right-running">
          <Box className="chemiassembler__content-right-running-name">Running: </Box>
          <Box className="chemiassembler__content-right-running-value">{data.running ? 'Yes' : 'No'}</Box>
        </Flex.Item>
      </Flex>
    </Box>
  );
};

type ReservoirTankProps = {
  index: number;
};

const ReservoirTank = ({ index }: ReservoirTankProps, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);

  const reservoir = data.reservoirs[index];

  const fill = 50;
  const color = reservoir === null ? 'red' : 'green';

  return (
    <Flex.Item
      onClick={(e) => {
        // Handle insert and ejecting reservoirs
        if (reservoir === null) {
          // Insert
          act('insert_reservoir', {
            user: data.active_user,
            index: index + 1,
          });
        } else {
          // Eject
          act('eject_reservoir', {
            user: data.active_user,
            index: index + 1,
          });
        }
      }}
      className="chemiassembler__content-right-reservoir">
      <div
        style={{
          'background-color': color || 'black',
          'height': `${fill}%`,
          'width': `100%`,
        }}
        className="chemiassembler__content-right-reservoir-fill"
      />
      {'#' + index}
      <span className="chemiassembler__content-right-reservoir-percent">{`${fill > 0 ? `${fill}` : 'EMP'}`}</span>
    </Flex.Item>
  );
};

type ControlsProps = {};

const Controls = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);
  const [program, setProgram] = useLocalState(context, 'program', data.raw_program || '');

  const compandrun = () => {
    // Compile and run
    act('compandrun', {
      program: program,
    });
  };

  const compile = () => {
    act('compile', {
      program: program,
    });
  };

  const stop = () => {
    act('stop');
  };

  const step = () => {
    act('step');
  };

  const reset = () => {
    act('reset');
  };

  return (
    <Flex className="chemiassembler__controls">
      <Flex.Item>
        <Button icon="play" content="Build and Run" onClick={compandrun} disabled={data.running} />
      </Flex.Item>
      <Flex.Item>
        <Button icon="code" content="Build" onClick={compile} disabled={data.running} />
      </Flex.Item>
      <Flex.Item>
        <Button icon="stop" content="Stop" onClick={stop} disabled={!data.running} />
      </Flex.Item>
      <Flex.Item>
        <Button icon="step-forward" content="Step" onClick={step} />
      </Flex.Item>
      <Flex.Item>
        <Button icon="undo" content="Reset" onClick={reset} disabled={data.running} />
      </Flex.Item>
    </Flex>
  );
};

type LineSepearatorProps = {
  direction: 'vertical' | 'horizontal';
};

export const LineSeperator = ({ direction }: LineSepearatorProps, context) => {
  const symbol = direction === 'vertical' ? '#' : '-';

  // Repeat the symbol 100 times
  const line = symbol.repeat(400);
  const lineArray = Array.from(line);
  return (
    <span className={`chemiassembler__seperator`}>
      {direction === 'vertical' ? lineArray.map((val, i) => <span key={i}>{symbol}</span>) : line}
    </span>
  );
};

export const Console = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);
  const [consoleOutput, setConsoleOutput] = useLocalState(context, 'consoleOutput', '');

  return <TextArea className="chemiassembler__console" value={data.reservoirs[2].initial_volume} />;
};
