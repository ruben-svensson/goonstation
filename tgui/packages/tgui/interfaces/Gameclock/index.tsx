import { useBackend } from '../../backend';
import { GameClockData } from './types';
import { Box, Button, Flex, Icon } from '../../components';
import { Window } from '../../layouts';

export const Gameclock = (_props, context) => {
  const { act, data } = useBackend<GameClockData>(context);

  return (
    <Window
      title={"Board Game Clock"}
      width={400}
      height={200}>
      <Window.Content scrollable>
        <Flex>
          <Flex.Item grow={1}>
            <SidePart iconName="far fa-circle-o" />
          </Flex.Item>
          <Flex.Item>
            <SwapButton />
          </Flex.Item>
          <Flex.Item grow={1}>
            <SidePart iconName="fas fa-circle" />
          </Flex.Item>
        </Flex>
      </Window.Content>
    </Window>
  );
};

const SidePart = (props) => {
  return (
    <Flex direction={'column'} className="gameclock__side">
      {/*
        to do: make it so that iconName isn't specified in the Window.Content and make icons contingent on a Side prop
     */}
      <Button className="gameclock__timebutton" icon={props.iconName} />
    </Flex>
  );
};

const SwapButton = () => {
  return (
    <Flex direction={'column'} className="gameclock__swap">
      <Button className="gameclock__swapbutton" icon="fas fa-exchange-alt" />
    </Flex>
  );
};
