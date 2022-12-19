/**
 * @file
 * @copyright 2022
 * @author DisturbHerb (https://github.com/disturbherb)
 * @license MIT
 */

import { useBackend } from '../../backend';
import { Window } from '../../layouts';
import { PhoneData } from './types';
import { Phonebook } from './components/Phonebook';

export const Phone = (props, context) => {
  const { data } = useBackend<PhoneData>(context);
  const { name } = data;
  return (
    <Window title={name} width={250} height={350}>
      <Window.Content>
        <Phonebook />
      </Window.Content>
    </Window>
  );
};
