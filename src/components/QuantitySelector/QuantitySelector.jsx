import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import PropTypes from "prop-types";

import {
  Selector,
  DecrementButton,
  IncrementButton,
  CurrentQuantity,
} from "./QuantitySelector.styles";

const QuantitySelector = ({ quantity, setQuantity, decrement, increment }) => {
  const [value, setValue] = useState(quantity.toString());

  const resetValue = () => setValue(quantity.toString());

  const handleValueChange = (event) => {
    setValue(event.target.value);
    clearTimeout(resetValue);

    if (
      event.target.value !== "" &&
      !isNaN(event.target.value) &&
      Number(event.target.value) >= 0
    ) {
      setQuantity(Number(event.target.value));
    }
  };

  useEffect(resetValue, [quantity]);

  return (
    <Selector aria-label="cart-quantity-selector">
      <DecrementButton
        onClick={decrement}
        aria-label="quantity-decrement-button"
      >
        <Minus />
      </DecrementButton>
      <CurrentQuantity
        type="text"
        aria-label="custom-quantity-input"
        value={value}
        onChange={handleValueChange}
        onBlur={resetValue}
      />
      <IncrementButton
        onClick={increment}
        aria-label="quantity-increment-button"
      >
        <Plus />
      </IncrementButton>
    </Selector>
  );
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
};

export default QuantitySelector;
