import { AddressGroup } from '.';
import { Box } from '../../../components';

export const Phonebook = () => {
  return (
    <Box className="Phone__book">
      <AddressGroup id={1} category="bridge" name="Bridge" depColour="green" />
      <AddressGroup id={2} category="engineering" name="Engineering" depColour="yellow" />
      <AddressGroup id={3} category="medical" name="Medical" depColour="blue" />
      <AddressGroup id={4} category="research" name="Research" depColour="purple" />
      <AddressGroup id={5} category="security" name="Security" depColour="red" />
      <AddressGroup id={6} category="uncategorized" name="Uncategorized" depColour="brown" />
    </Box>
  );
};
