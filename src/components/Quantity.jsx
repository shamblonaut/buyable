import styled from "styled-components";
import { Minus, Plus } from "lucide-react";

const Selector = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px 0;
`;

const Button = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;

  & .lucide {
    width: 20px;
    height: auto;
  }
`;

const CurrentQuantity = styled.p`
  font-weight: 500;
  font-size: 1.1rem;
`;

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
