import { useBackend, useLocalState } from '../backend';
import { Box, Button, Flex, Input, Knob, LabeledList } from '../components';

import { Window } from '../layouts';
type ProductRecord = {
  name: string;
  price: number;
  amount: number;
  icon: string;
};

type VendingMachineInfo = {
  name: string;
  uiMainColor: string;
};

type VendingMachineData = {
  info: VendingMachineInfo;
  products: ProductRecord[];
};

export const VendingMachine = (props, context) => {
  const { act, data } = useBackend<VendingMachineData>(context);
  const { info, products } = data;

  return (
    <Window title={info.name} width={340} height={500}>
      <Window.Content className="vending__content" style={{ background: info.uiMainColor }}>
        <Box className="vending__panel">
          {products.map((product, index) => {
            return (
              <Box key={index} className="vending__product">
                <span className="vending__pamount">{product.amount}</span>
                <img src={`data:image/png;base64, ${product.icon}`} />
                <span className="vending__ptext">{product.name}</span>
                <span className="vending__pprice">{product.price > 0 ? `$${product.price}` : 'Free'}</span>
              </Box>
            );
          })}
        </Box>
      </Window.Content>
    </Window>
  );
};
