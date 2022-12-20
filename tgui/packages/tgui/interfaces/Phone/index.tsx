/**
 * @file
 * @copyright 2022
 * @author DisturbHerb (https://github.com/disturbherb)
 * @license MIT
 */

import { useBackend, useLocalState } from '../../backend';
import { Icon, Box } from '../../components';
import { Window } from '../../layouts';
import { PhoneData } from './types';

const testData = [
  { number: '962-2212', name: 'Science Teleporter', color: 'green' },
  { number: '631-6339', name: 'Robotics', color: 'red' },
  { number: '354-0667', name: 'Medbay', color: 'blue' },
  { number: '238-8110', name: 'Engineering', color: 'yellow' },
  { number: '412-7291', name: 'Security', color: 'red' },
  { number: '632-4825', name: 'Cargo', color: 'yellow' },
  { number: '745-1890', name: 'Bridge', color: 'green' },
  { number: '452-9018', name: 'Atmospherics', color: 'yellow' },
  { number: '745-0212', name: 'Bar', color: 'brown' },
  { number: '235-3724', name: 'Chapel', color: 'brown' },
  { number: '965-4420', name: 'Cryogenics', color: 'blue' },
  { number: '875-1067', name: 'Escape', color: 'brown' },
  { number: '023-6282', name: 'Holodeck', color: 'brown' },
  { number: '523-8595', name: 'Hydroponics', color: 'brown' },
  { number: '123-0521', name: 'Library', color: 'brown' },
  { number: '518-1827', name: 'Mining', color: 'brown' },
  { number: '273-9201', name: 'Research', color: 'purple' },
  { number: '127-7462', name: 'Service', color: 'brown' },
  { number: '827-3121', name: 'Xenobiology', color: 'purple' },
  { number: '456-6988', name: 'Xenobotany', color: 'purple' },
  { number: '520-9313', name: 'AI Upload', color: 'brown' },
  { number: '678-4122', name: 'Arrivals', color: 'brown' },
  { number: '921-7353', name: 'Crew Quarters', color: 'brown' },
  { number: '378-2118', name: 'Locker Room', color: 'brown' },
  { number: '258-9662', name: 'Maintenance', color: 'brown' },
];

export const Phone = (props, context) => {
  const { act, data } = useBackend<PhoneData>(context);
  const { name } = data;

  const [selectedPhoneId] = useLocalState(context, 'selectedPhoneId', null);
  const [phoneNumber, setPhoneNumber] = useLocalState(context, 'phoneNumber', '');

  const callSelectedPhone = () => {
    const phone = testData.find((phone) => phone.number.replace('-', '') === phoneNumber);
    act('call', { target: phone.name });
  };

  return (
    <Window title={name} width={320} height={400}>
      <Window.Content className="Phone__">
        <div className="Phone__content">
          <div className="Phone__content-display">
            <Dial />
            <NumberDisplay />
            <Book />
          </div>
          <div className="Phone__content-case">
            <div
              className="Phone__content-case-button"
              onClick={() => {
                callSelectedPhone();
              }}>
              <Icon name="phone" />
            </div>
            <div className="Phone__content-case-button">
              <Icon name="volume-off" />
            </div>
            <div className="Phone__content-case-button">
              <Icon name="phone-slash" />
            </div>
          </div>
        </div>
      </Window.Content>
    </Window>
  );
};

type DialProps = {};

const Dial = (props, context) => {
  return (
    <div className="Phone__dial">
      <DialNumber number={'1'} />
      <DialNumber number={'2'} />
      <DialNumber number={'3'} />
      <DialNumber number={'4'} />
      <DialNumber number={'5'} />
      <DialNumber number={'6'} />
      <DialNumber number={'7'} />
      <DialNumber number={'8'} />
      <DialNumber number={'9'} />
      <DialNumber number={'*'} />
      <DialNumber number={'0'} />
      <DialNumber number={'#'} />
    </div>
  );
};

type DialNumberProps = {
  number: string;
};

const DialNumber = ({ number }: DialNumberProps, context) => {
  const [phoneNumber, setPhoneNumber] = useLocalState(context, 'phoneNumber', '');

  const handleNumberClick = (number) => {
    setPhoneNumber(phoneNumber + number);
  };

  return (
    <div
      onClick={() => {
        handleNumberClick(number);
      }}>
      {number}
    </div>
  );
};

const NumberDisplay = (props, context) => {
  const [phoneNumber, setPhoneNumber] = useLocalState(context, 'phoneNumber', '');

  return (
    <div className="Phone__content-display-number">
      {phoneNumber.length > 3 ? phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3) : phoneNumber}
      {phoneNumber.length > 0 && (
        <Icon name="times" style={{ 'padding-left': '5px', cursor: 'pointer' }} onClick={() => setPhoneNumber('')} />
      )}
    </div>
  );
};

type TestData = {
  number: string;
  name: string;
};

const Book = (props, context) => {
  const [phoneNumber, setPhoneNumber] = useLocalState(context, 'phoneNumber', '');

  const sortedTestData = testData
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((data) => data.number.replace('-', '').includes(phoneNumber));

  const data = sortedTestData[0];
  if (sortedTestData.length === 1 && phoneNumber === data.number.replace('-', '')) {
    return <h3>{data.name}</h3>;
  }

  return (
    <div className="Phone__book">
      {sortedTestData.map((data) => (
        <div key={data.number} className="Phone__book-entry">
          <div className="Phone__book-entry-number">
            <Icon name="phone" />
            <div
              onClick={() => {
                setPhoneNumber(data.number.replace('-', ''));
              }}
              style={{
                'cursor': 'pointer',
              }}>
              {data.number}
            </div>
          </div>
          <Box className="Phone__book-entry-name">{data.name}</Box>
        </div>
      ))}
    </div>
  );
};
