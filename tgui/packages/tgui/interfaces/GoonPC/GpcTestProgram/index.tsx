import { useBackend } from '../../../backend';
import { Window } from '../../../layouts';
import { Box, Flex, Button } from '../../../components';

type GpcTestProgramData = {};

export const GpcTestProgram = (props, context) => {
  const { act, data } = useBackend<GpcTestProgramData>(context);

  return (
    <Box position="fixed" ml={`${50}px`} mt={`${50 + 32}px`} width={30} height={20} className="goonpc__window">
      <Flex align="center" className="goonpc__window-menubar">
        <Flex.Item grow={1}>Test Program</Flex.Item>
        <Button>-</Button>
        <Button>X</Button>
      </Flex>
    </Box>
  );
};
