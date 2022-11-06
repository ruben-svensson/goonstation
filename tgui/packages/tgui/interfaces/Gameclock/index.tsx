import { useBackend, useLocalState } from '../../backend';
import { GameClockData } from './types';
import { AnimatedNumber, Box, Button, Dimmer, Flex, Icon, LabeledList, NumberInput, Tooltip } from '../../components';
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
      <Window.Content scrollable>
        {configModalOpen && (
          <ConfigModal />
        )}
        <Flex>
          <Flex.Item grow={1}>
            <SidePart team={data.swap ? 'black' : 'white'} />
          </Flex.Item>
          <Flex.Item>
            <MidPart />
          </Flex.Item>
          <Flex.Item grow={1}>
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
          <Button
            content={turnBuffer ? "White" : "Black"}
            onClick={() => setTurnBuffer(!turnBuffer)}
          />
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

const MidPart = (props, context) => {
  const { data, act } = useBackend<GameClockData>(context);

  const [, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [, setTurnBuffer] = useLocalState(context, 'turnBuffer', true);
  const [, setWhiteTimeBuffer] = useLocalState(context, 'whiteTimeBuffer', 0);
  const [, setBlackTimeBuffer] = useLocalState(context, 'blackTimeBuffer', 0);

  return (
    <Flex direction={'column'} className="gameclock__mid">
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
      <Button
        className="gameclock__utilbutton"
        disabled={data.whiteTime === 0 || data.blackTime === 0}
        tooltip={data.timing? "Pause" : "Unpause"}
        tooltipPosition="top"
        icon={data.timing ? 'pause' : 'play'}
        color={data.timing ? 'orange' : ''}
        onClick={() => act('toggle_timing')}
      />
      <Button
        className="gameclock__utilbutton"
        disabled={data.timing}
        tooltip="Swap sides"
        tooltipPosition="top"
        icon="exchange-alt"
        onClick={() => act('swap')}
      />
    </Flex>
  );
};

const SidePart = (props: TeamProps, context) => {
  const { data, act } = useBackend<GameClockData>(context);

  const { team } = props;

  const showTime = (value) => {
    return formatTime(value * 10);
  };

  return (
    <Flex direction={'column'} className="gameclock__side">
      <Tooltip position="bottom" content={team === 'white' ? "White" : "Black"}>
        <Icon
          className="gameclock__sideicon"
          name={`circle${team === 'white' ? '-o' : ''}`}
        />
      </Tooltip>
      <Button
        color="orange"
        disabled={!data.timing || (data.turn ? team === 'black' : team === 'white')}
        className="gameclock__timebutton"
        onClick={() => act('end_turn')}>
        <Flex className="gameclock__timeflex">
          <AnimatedNumber value={team === 'white' ? data.whiteTime : data.blackTime} format={showTime} />
        </Flex>
      </Button>
    </Flex>
  );
};
