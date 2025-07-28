import { Minus, Plus } from "lucide-react";

import {
  Selector,
  DecrementButton,
  IncrementButton,
  CurrentQuantity,
} from "./Quantity.styles";

const Quantity = ({ quantity, decrement, increment }) => (
  <Selector>
    <DecrementButton onClick={decrement}>
      <Minus />
    </DecrementButton>
    <CurrentQuantity>{quantity}</CurrentQuantity>
    <IncrementButton onClick={increment}>
      <Plus />
    </IncrementButton>
  </Selector>
);

export default Quantity;
