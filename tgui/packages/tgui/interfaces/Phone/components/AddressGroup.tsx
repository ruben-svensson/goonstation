import { useBackend, useLocalState } from '../../../backend';
import { Button, Collapsible } from '../../../components';
import { PhoneData } from '../types';

export const AddressGroup = (props, context) => {
  const { act, data } = useBackend<PhoneData>(context);
  const { category, name, depColour } = props;
  const { phonebook } = data;

  const [selectedPhoneId, setSelectedPhoneId] = useLocalState(

  return (
    <Collapsible title={name} color={depColour}>
      {phonebook.map(
        (currentPhone) =>
          currentPhone.category === category && (
            <Button
              fluid
              content={currentPhone.id}
              key={currentPhone.id}
              onClick={() => act('call', { target: currentPhone.id })}
              textAlign="center"
              className="Phone__phonebook-Button"
            />
          )
      )}
    </Collapsible>
  );
};
