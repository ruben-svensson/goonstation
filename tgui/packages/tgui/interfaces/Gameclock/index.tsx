import { useBackend, useLocalState } from '../../backend';
import { GameClockData } from './types';
import { AnimatedNumber, Box, Button, Dimmer, Flex, Icon, LabeledList, NumberInput } from '../../components';
import { Window } from '../../layouts';
import { formatTime } from '../../format';

const MAX_TIME = 1800;

export const Gameclock = (_props, context) => {
  const { act, data } = useBackend<GameClockData>(context);

  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [whiteTimeBuffer, setWhiteTimeBuffer] = useLocalState(context, 'whiteTimeBuffer', 0);
  const [blackTimeBuffer, setBlackTimeBuffer] = useLocalState(context, 'blackTimeBuffer', 0);

  const setTime = (whiteTime, blackTime) => {
    act("set_time", {
      'whiteTime': whiteTime * 10,
      'blackTime': blackTime * 10,
    });
  };

  return (
    <Window
      title={"Board Game Clock"}
      width={400}
      height={200}>
      <Window.Content scrollable>
        {configModalOpen && (
          <Dimmer className="gameclock__configmodal">
            <LabeledList>
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
                }}
              />
              <Button
                content="Close without applying"
                onClick={() => setConfigModalOpen(false)}
              />
            </Box>
          </Dimmer>
        )}
        <Flex>
          <Flex.Item grow={1}>
            <SidePart team={'white'} />
          </Flex.Item>
          <Flex.Item>
            <Flex direction={'column'} className="gameclock__mid">
              <ConfigButton />
              <PauseButton />
              <SwapButton />
            </Flex>
          </Flex.Item>
          <Flex.Item grow={1}>
            <SidePart team={'black'} />
          </Flex.Item>
        </Flex>
      </Window.Content>
    </Window>
  );
};

type TeamProps = {
  team: 'white' | 'black';
};

const TimeInput = (props: TeamProps, context) => {

  const { team } = props;

  const [whiteTimeBuffer, setWhiteTimeBuffer] = useLocalState(context, 'whiteTimeBuffer', 0);
  const [blackTimeBuffer, setBlackTimeBuffer] = useLocalState(context, 'blackTimeBuffer', 0);

  const showTime = (value) => {
    return formatTime(value * 10);
  };

  return (
    <NumberInput
      onDrag={(_e, value) => { team === 'white' ? setWhiteTimeBuffer(value) : setBlackTimeBuffer(value); }}
      format={showTime}
      value={team === 'white' ? whiteTimeBuffer : blackTimeBuffer}
      minValue={0}
      maxValue={MAX_TIME}
      step={15}
    />
  );
};

const ConfigButton = (_, context) => {
  const { data } = useBackend<GameClockData>(context);

  const [, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [, setWhiteTimeBuffer] = useLocalState(context, 'whiteTimeBuffer', 0);
  const [, setBlackTimeBuffer] = useLocalState(context, 'blackTimeBuffer', 0);

  return (
    <Button
      className="gameclock__utilbutton"
      icon="cog"
      onClick={() => {
        setConfigModalOpen(true);
        setWhiteTimeBuffer(data.whiteTime);
        setBlackTimeBuffer(data.blackTime);
      }}
    />
  );
};

const PauseButton = (_, context) => {
  const { act } = useBackend(context);

  return (
    <Button
      className="gameclock__utilbutton"
      icon="pause"
      onClick={() => act('toggle_timing')}
    />
  );
};

const SwapButton = (_, context) => {
  const [team, setTeam]= useLocalState(context, 'team', '');

  const swapTeams = () => {
    setTeam(team === 'white' ? 'black' : 'white');
  };

  return (
    <Button onClick={swapTeams} className="gameclock__utilbutton" icon="exchange-alt" />
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
      <Icon className="gameclock__sideicon" name={`circle${team === 'white' ? "-o" : ''}`} />
      <Button className="gameclock__timebutton" onClick={() => act('end_turn')}>
        <Flex className="gameclock__timeflex">
          <AnimatedNumber value={team === 'white' ? data.whiteTime : data.blackTime} format={showTime} />
        </Flex>
      </Button>
    </Flex>
  );
};
