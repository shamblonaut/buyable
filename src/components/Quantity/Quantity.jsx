import { Minus, Plus } from "lucide-react";

import { Selector, Button, CurrentQuantity } from "./Quantity.styles";

const Quantity = ({ quantity, decrement, increment }) => (
  <Selector>
    <Button onClick={decrement}>
      <Minus />
    </Button>
    <CurrentQuantity>{quantity}</CurrentQuantity>
    <Button onClick={increment}>
      <Plus />
    </Button>
  </Selector>
);

export default Quantity;
