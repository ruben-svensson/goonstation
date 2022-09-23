/**
 * @file
 * @copyright 2022
 * @author Grokberg
 * @license MIT
 */

import { useBackend, useLocalState } from '../../backend';
import { Window } from '../../layouts';
import { Box, Flex, Button } from '../../components';

import { GpcTestProgram } from './GpcTestProgram';

type GoonPCData = {};

export const GoonPC = (props, context) => {
  const { act, data } = useBackend<GoonPCData>(context);

  const [activePrograms, setActivePrograms] = useLocalState(context, 'activePrograms', []);
  return (
    <Window title="GoonPC" width="600" height="600">
      <Window.Content fitted className="goonpc__content">
        <Box className="goonpc__desktop">
          <Box>
            <DesktopIcon />
          </Box>
        </Box>
        <StartMenu />
        <Box bold className="goonpc__taskbar">
          Start
        </Box>
      </Window.Content>
    </Window>
  );
};

const StartMenu = () => {
  return (
    <Flex direction="row" className="goonpc__start-menu">
      <Flex.Item className="goonpc__start-menu-items">
        <Flex.Item className="goonpc__start-menu-item">
          <Box className="fas fa-terminal" />
          <span>Programs</span>
        </Flex.Item>
        <Flex.Item className="goonpc__start-menu-item">
          <Box className="fas fa-folder" />
          <span>Files</span>
        </Flex.Item>
        <Flex.Item className="goonpc__start-menu-item">
          <Box className="fas fa-question" />
          <span>Help</span>
        </Flex.Item>
        <Flex.Item className="goonpc__start-menu-seperator" />
        <Flex.Item className="goonpc__start-menu-item">
          <Box className="fas fa-power-off" />
          <span>Shutdown...</span>
        </Flex.Item>
      </Flex.Item>
    </Flex>
  );
};

const DesktopIcon = () => {
  return (
    <Flex width={'50px'} direction="column" inline>
      <Flex.Item height={'50px'} className="goonpc__desktop-icon fas fa-terminal" />
      <Flex.Item className="goonpc__desktop-icon-label">Test Program</Flex.Item>
    </Flex>
  );
};
