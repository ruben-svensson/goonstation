declare const React;

import { Window } from '../../layouts';
import { useBackend, useLocalState } from '../../backend';
import { Box, Button, Flex, Stack, TextArea, Tooltip } from '../../components';

import { CodeEditor } from './CodeEditor';

type Reservoir = {
  name: string;
  initVolume: number;
  totalVolume: number;
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
  console_output: string[];
  active_user: User; // ckey
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
            <LineSeperator direction={'horizontal'} />
            <Reservoirs />
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
        <h3 className="chemiassembler__header">Registers</h3>
        <Flex justify="space-between">
          {Object.keys(data.registers).map((register) => {
            return (
              <Flex.Item className="chemiassembler__content-right-register" key={register}>
                <Box className="chemiassembler__content-right-register-name">{register}: </Box>
                <Box className="chemiassembler__content-right-register-value">{data.registers[register]}</Box>
              </Flex.Item>
            );
          })}
        </Flex>
      </Flex>
      <LineSeperator direction={'horizontal'} />
      <Flex
        style={{
          'flex-direction': 'column',
          'flex-grow': 1,
        }}>
        <Flex.Item>
          <h3 className="chemiassembler__header">Variables: {Object.keys(data.variables)}</h3>
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
          <h3 className="chemiassembler__header">Runtime Info</h3>
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

const Reservoirs = (props, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);
  /** { data.reservoirs.map((reservoir, i) => {
            return <ReservoirTank key={i} index={i} />;
          })} */
  return (
    <Flex direction={'row'}>
      <h3 className="chemiassembler__content-reservoirs-header" style={{}}>
        Reservoirs
      </h3>
      <Flex.Item grow>
        <Flex className="chemiassembler__content-reservoirs">{'[Fill this space with good looking reservoirs]'}</Flex>
      </Flex.Item>
    </Flex>
  );
};

type ReservoirTankProps = {
  index: number;
};

const ReservoirTank = ({ index }: ReservoirTankProps, context) => {
  const { act, data } = useBackend<ChemiAssemblerData>(context);

  const reservoir = data.reservoirs[index];

  let fill = 0;
  if (reservoir) {
    fill = (reservoir.totalVolume / reservoir.initVolume) * 100;
  }
  const color = reservoir === null ? '' : 'green';

  return (
    <Flex.Item
      onClick={(e) => {
        // Handle insert and ejecting reservoirs
        if (reservoir === null) {
          // Insert
          act('insert_reservoir', {
            ckey: data.active_user.ckey,
            index: index + 1,
          });
        } else {
          // Eject
          act('eject_reservoir', {
            ckey: data.active_user.ckey,
            index: index + 1,
          });
        }
      }}
      className="chemiassembler__content-reservoirs-reservoir">
      <Flex direction="column" className="chemiassembler__content-reservoirs-reservoir-wrapper">
        <Flex.Item className="chemiassembler__content-reservoirs-reservoir-header">{`Res: ${index + 1}`}</Flex.Item>
        <Flex.Item className="chemiassembler__content-reservoirs-reservoir-tank">
          <Flex className="chemiassembler__content-reservoirs-reservoir-tank-reagants">
            <ResReagant name={'Blood'} color={'red'} fill={10} />
            <ResReagant name={'Milk'} color={'white'} fill={20} />
            <ResReagant name={'Tubby custard'} color={'pink'} fill={40} />
          </Flex>
        </Flex.Item>
      </Flex>
    </Flex.Item>
  );
};

type ResReagantProps = {
  name: string;
  fill: number;
  color: string;
};

const ResReagant = ({ fill, color, name }: ResReagantProps, context) => {
  return (
    <Tooltip position="top" content={`${fill}u ${name}`}>
      <Box
        className="chemiassembler__content-reservoirs-reservoir-tank-reagants-reagant"
        style={{
          'width': `${fill}%`,
          'background-color': color,
        }}
      />
    </Tooltip>
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

  // Repeat the symbol 100 timeregisters
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
  const [program, setProgram] = useLocalState(context, 'program', data.raw_program || '');
  const [consoleOutput, setConsoleOutput] = useLocalState(context, 'consoleOutput', '');

  return (
    <Flex direction={'column'}>
      <Flex.Item>
        <h3 className="chemiassembler__content-reservoirs-header">Console</h3>
      </Flex.Item>
      <Flex.Item grow className="chemiassembler__console">
        <Flex direction={'column'} className="chemiassembler__console-textarea">
          {data.console_output.reverse().map((line, i) => (
            <Flex.Item key={i}>
              <span>{line}</span>
            </Flex.Item>
          ))}
        </Flex>
      </Flex.Item>
    </Flex>
  );
};
