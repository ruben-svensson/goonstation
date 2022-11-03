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

  const showTime = (value) => {
    return formatTime(value * 10);
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
                <NumberInput
                  onDrag={(_e, value) => setWhiteTimeBuffer(value)}
                  format={showTime}
                  value={whiteTimeBuffer}
                  minValue={0}
                  maxValue={MAX_TIME}
                  step={15}
                />
              </LabeledList.Item>
              <LabeledList.Item label="Time (Black)">
                <NumberInput
                  onDrag={(_e, value) => setBlackTimeBuffer(value)}
                  format={showTime}
                  value={blackTimeBuffer}
                  minValue={0}
                  maxValue={MAX_TIME}
                  step={15}
                />
              </LabeledList.Item>
            </LabeledList>
            <Box className="gameclock__configmodalbuttoncontainer">
              <Button
                onClick={() => {
                  setConfigModalOpen(false);
                  setTime(whiteTimeBuffer, blackTimeBuffer);
                }}
                content="Apply and close"
              />
              <Button
                onClick={() => setConfigModalOpen(false)}
                content="Close without applying"
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
              <Button className="gameclock__utilbutton" icon="cog" onClick={() => { setConfigModalOpen(true); setWhiteTimeBuffer(data.whiteTime); setBlackTimeBuffer(data.blackTime); }} />
              <Button className="gameclock__utilbutton" icon="pause" />
              <Button className="gameclock__utilbutton" icon="exchange-alt" />
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

type SidePartProps = {
  team: 'white' | 'black';
};

const SidePart = (props: SidePartProps, context) => {
  const { data, act } = useBackend<GameClockData>(context);

  const { team } = props;

  const showTime = (value) => {
    return formatTime(value * 10);
  };

  return (
    <Flex direction={'column'} className="gameclock__side">
      <Icon className="gameclock__sideicon" name={`circle${team === 'white' ? "-o" : ''}`} />
      <Button className="gameclock__timebutton" onClick={() => act('toggle_timing')}>
        <Flex className="gameclock__timeflex">
          <AnimatedNumber value={team === 'white' ? data.whiteTime : data.blackTime} format={showTime} />
        </Flex>
      </Button>
    </Flex>
  );
};
