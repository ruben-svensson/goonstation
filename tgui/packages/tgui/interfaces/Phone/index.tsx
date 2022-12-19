/**
 * @file
 * @copyright 2022
 * @author DisturbHerb (https://github.com/disturbherb)
 * @license MIT
 */

import { useBackend } from '../../backend';
import { Window } from '../../layouts';
import { PhoneData } from './types';
import { RotaryPhone } from './components';

export const Phone = (props, context) => {
  const { data } = useBackend<PhoneData>(context);
  const { name } = data;
  return (
    <Window title={name} width={350} height={350}>
      <Window.Content>
        <RotaryPhone />
      </Window.Content>
    </Window>
  );
};
