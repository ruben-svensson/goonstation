import { useBackend } from '../../backend';
import { Window } from '../../layouts';

type GoonPCData = {};

export const GoonPC = (props, context) => {
  const { act, data } = useBackend<GoonPCData>(context);
  return (
    <Window title="GoonPC" width="400" height="300">
      <Window.Content>
        <h1>Welcome</h1>
      </Window.Content>
    </Window>
  );
};
