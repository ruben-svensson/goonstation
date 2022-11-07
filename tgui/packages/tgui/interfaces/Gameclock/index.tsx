import { useBackend, useLocalState } from '../../backend';
import { GameClockData } from './types';
import {
  AnimatedNumber,
  Box,
  Button,
  Dimmer,
  Flex,
  Icon,
  LabeledList,
  NumberInput,
  Stack,
  Tooltip,
} from '../../components';
import { Window } from '../../layouts';
import { formatTime } from '../../format';

type TeamProps = {
  team: 'white' | 'black';
};

export const Gameclock = (_props, context) => {
  const { data } = useBackend<GameClockData>(context);

  const [configModalOpen] = useLocalState(context, 'configModalOpen', false);

  return (
    <Window title={'Board Game Clock'} width={400} height={230}>
      <Window.Content className="gameclock__window" fitted>
        {configModalOpen && <ConfigModal />}
        <Flex className="gameclock__wrapper">
          <Flex.Item className="gameclock__sidewrapper">
            <TeamIcon team={data.swap ? 'black' : 'white'} />
            <SidePart team={data.swap ? 'black' : 'white'} />
          </Flex.Item>
          <MidPart />
          <Flex.Item className="gameclock__sidewrapper">
            <TeamIcon team={data.swap ? 'white' : 'black'} />
            <SidePart team={data.swap ? 'white' : 'black'} />
          </Flex.Item>
        </Flex>
      </Window.Content>
    </Window>
  );
};

const ConfigModal = (_, context) => {
  const { act } = useBackend<GameClockData>(context);

  const [, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [turnBuffer, setTurnBuffer] = useLocalState(context, 'turnBuffer', true);
  const [whiteTimeBuffer] = useLocalState(context, 'whiteTimeBuffer', 0);
  const [blackTimeBuffer] = useLocalState(context, 'blackTimeBuffer', 0);

  const setTime = (whiteTime, blackTime) => {
    act('set_time', {
      'whiteTime': whiteTime * 10,
      'blackTime': blackTime * 10,
    });
  };

  return (
    <Dimmer className="gameclock__configmodal">
      <LabeledList>
        <LabeledList.Item label="Current Turn">
          <Button content={turnBuffer ? 'White' : 'Black'} onClick={() => setTurnBuffer(!turnBuffer)} />
        </LabeledList.Item>
        <LabeledList.Item label="Time (White)">
          <TimeInput team={'white'} />
        </LabeledList.Item>
        <LabeledList.Item label="Time (Black)">
          <TimeInput team={'black'} />
        </LabeledList.Item>
      </LabeledList>
      <Box className="gameclock__configmodalbuttoncontainer">
        <Button
          content="Apply and close"
          onClick={() => {
            setConfigModalOpen(false);
            setTime(whiteTimeBuffer, blackTimeBuffer);
            act('set_turn', { 'nextTurn': turnBuffer });
          }}
        />
        <Button content="Close without applying" onClick={() => setConfigModalOpen(false)} />
      </Box>
    </Dimmer>
  );
};

const TimeInput = (props: TeamProps, context) => {
  const { data } = useBackend<GameClockData>(context);

  const { minTime, maxTime } = data.clockStatic;

  const { team } = props;

  const [whiteTimeBuffer, setWhiteTimeBuffer] = useLocalState(context, 'whiteTimeBuffer', 0);
  const [blackTimeBuffer, setBlackTimeBuffer] = useLocalState(context, 'blackTimeBuffer', 0);

  const showTime = (value) => {
    return formatTime(value * 10);
  };

  return (
    <NumberInput
      onDrag={(_e, value) => {
        team === 'white' ? setWhiteTimeBuffer(value) : setBlackTimeBuffer(value);
      }}
      format={showTime}
      value={team === 'white' ? whiteTimeBuffer : blackTimeBuffer}
      minValue={minTime}
      maxValue={maxTime}
      step={15}
      stepPixelSize={2}
    />
  );
};

const TeamIcon = (props: TeamProps, context) => {
  const { team } = props;

  return (
    <Stack direction={'column'}>
      <Tooltip position="bottom" content={team === 'white' ? 'White' : 'Black'}>
        <Icon className="gameclock__teamicon" name={`circle${team === 'white' ? '-o' : ''}`} />
      </Tooltip>
    </Stack>
  );
};

const MidPart = (_, context) => {
  const { data, act } = useBackend<GameClockData>(context);

  const [, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [, setTurnBuffer] = useLocalState(context, 'turnBuffer', true);
  const [, setWhiteTimeBuffer] = useLocalState(context, 'whiteTimeBuffer', 0);
  const [, setBlackTimeBuffer] = useLocalState(context, 'blackTimeBuffer', 0);

  return (
    <Stack direction={'column'} className="gameclock__mid">
      <Box>
        <Button
          className="gameclock__utilbutton"
          disabled={data.timing}
          tooltip="Setup"
          tooltipPosition="top"
          icon="cog"
          onClick={() => {
            setConfigModalOpen(true);
            setTurnBuffer(data.turn);
            setWhiteTimeBuffer(data.whiteTime);
            setBlackTimeBuffer(data.blackTime);
          }}
        />
      </Box>
      <Box>
        <Button
          className="gameclock__utilbutton"
          disabled={data.whiteTime === 0 || data.blackTime === 0}
          tooltip={data.timing ? 'Pause' : 'Unpause'}
          tooltipPosition="top"
          icon={data.timing ? 'pause' : 'play'}
          color={data.timing ? 'orange' : ''}
          onClick={() => act('toggle_timing')}
        />
      </Box>
      <Box>
        <Button
          className="gameclock__utilbutton"
          disabled={data.timing}
          tooltip="Swap sides"
          tooltipPosition="top"
          icon="exchange-alt"
          onClick={() => act('swap')}
        />
      </Box>
    </Stack>
  );
};

const SidePart = (props: TeamProps, context) => {
  const { data, act } = useBackend<GameClockData>(context);

  const { team } = props;

  const showTime = (value) => {
    return formatTime(value * 10);
  };

  return (
    <Stack direction={'column'} fill className="gameclock__sidepart">
      <Button
        color="orange"
        disabled={!data.timing || (data.turn ? team === 'black' : team === 'white')}
        className="gameclock__timebutton"
        onClick={() => act('end_turn')}>
        <Stack className="gameclock__timeflex">
          <AnimatedNumber value={team === 'white' ? data.whiteTime : data.blackTime} format={showTime} />
        </Stack>
      </Button>
    </Stack>
  );
};
