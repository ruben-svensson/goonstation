import { useBackend } from '../../../backend';
import { Window } from '../../../layouts';
import { Box, Flex, Button } from '../../../components';

export const WindowTitleBar = (_props, context) => {
  const { act, data } = useBackend(context);
  return (
    <Flex align="center" className="goonpc__window-menubar">
      <Flex.Item grow={1}>Test Program</Flex.Item>
      <Button>-</Button>
      <Button>X</Button>
    </Flex>
  );
};
