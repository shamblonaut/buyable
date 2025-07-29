import { Minus, Plus } from "lucide-react";

import {
  Selector,
  DecrementButton,
  IncrementButton,
  CurrentQuantity,
} from "./QuantitySelector.styles";

const QuantitySelector = ({ quantity, setQuantity, decrement, increment }) => {
  const handleQuantityChange = (event) => {
    if (event.target.value === "" || isNaN(event.target.value)) return;

    setQuantity(Number(event.target.value));
  };

  return (
    <Selector>
      <DecrementButton onClick={decrement}>
        <Minus />
      </DecrementButton>
      <CurrentQuantity
        type="text"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <IncrementButton onClick={increment}>
        <Plus />
      </IncrementButton>
    </Selector>
  );
};

export default QuantitySelector;
