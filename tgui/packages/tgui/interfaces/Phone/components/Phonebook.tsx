import { Section } from '../../../components';
import { AddressGroup } from '.';

export const Phonebook = () => {
  return (
    <Section title="Phonebook" fill scrollable>
      <AddressGroup category="bridge" name="Bridge" depColour="green" />
      <AddressGroup category="engineering" name="Engineering" depColour="yellow" />
      <AddressGroup category="medical" name="Medical" depColour="blue" />
      <AddressGroup category="research" name="Research" depColour="purple" />
      <AddressGroup category="security" name="Security" depColour="red" />
      <AddressGroup category="uncategorized" name="Uncategorized" depColour="brown" />
    </Section>
  );
};
