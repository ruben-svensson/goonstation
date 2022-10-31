import { useBackend, useLocalState } from '../../backend';
import { GameClockData } from './types';
import { Button, Flex, Icon, LabeledList, Modal, NumberInput } from '../../components';
import { Window } from '../../layouts';
import { formatTime } from '../../format';

const MAX_TIME = 1800;

export const Gameclock = (_props, context) => {
  const { act, data } = useBackend<GameClockData>(context);

  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);

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
          <Modal>
            <Button.Checkbox content="Use separate times" />
            <LabeledList>
              <LabeledList.Item label="Time per side">
                <NumberInput
                  format={showTime}
                  maxValue={MAX_TIME}
                />
              </LabeledList.Item>
              <LabeledList.Item label="Time (White)">
                <NumberInput
                  format={showTime}
                  maxValue={MAX_TIME}
                />
              </LabeledList.Item>
              <LabeledList.Item label="Time (Black)">
                <NumberInput
                  format={showTime}
                  maxValue={MAX_TIME}
                />
              </LabeledList.Item>
            </LabeledList>
            <Button onClick={() => setConfigModalOpen(false)}>Close</Button>
          </Modal>
        )}
        <Flex>
          <Flex.Item grow={1}>
            <SidePart team={'white'} />
          </Flex.Item>
          <Flex.Item>
            <Flex direction={'column'} className="gameclock__mid">
              <Button className="gameclock__utilbutton" icon="cog" onClick={() => setConfigModalOpen(true)} />
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

const SidePart = (props: SidePartProps) => {
  const { team } = props;
  return (
    <Flex direction={'column'} className="gameclock__side">
      <Icon className="gameclock__sideicon" name={`circle${team === 'white' ? "-o" : ''}`} />
      <Button className="gameclock__timebutton"><Flex className="gameclock__timeflex">00:00</Flex></Button>
    </Flex>
  );
};
