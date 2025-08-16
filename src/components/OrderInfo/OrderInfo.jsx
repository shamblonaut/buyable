import { useContext } from "react";
import { ShoppingBag } from "lucide-react";
import PropTypes from "prop-types";

import { CartAction } from "@/utils/constants";

import { CartContext } from "@/contexts";

import {
  Container,
  Title,
  SubtotalField,
  TaxField,
  TotalPriceField,
  CheckoutLink,
} from "./OrderInfo.styles";

const OrderInfo = ({ products, taxPercent }) => {
  const { cart, dispatchCartAction } = useContext(CartContext);

  const subtotal = products.reduce(
    (sum, product) =>
      cart[product.id] ? sum + product.price * cart[product.id] : sum,
    0,
  );
  const tax = subtotal * (taxPercent / 100);
  const total = subtotal + tax;

  const clearCart = () => {
    dispatchCartAction({ type: CartAction.CLEARED });
  };

  return (
    <Container>
      <Title>Order Summary</Title>
      <SubtotalField>
        <label>Subtotal: </label>
        <p>${subtotal.toFixed(2)}</p>
      </SubtotalField>
      <TaxField>
        <label>Tax (12%): </label>
        <p>${tax.toFixed(2)}</p>
      </TaxField>
      <TotalPriceField>
        <label>Total Price: </label>
        <p>${total.toFixed(2)}</p>
      </TotalPriceField>
      <CheckoutLink to="/disclaimer" onClick={clearCart}>
        <ShoppingBag /> Place Order
      </CheckoutLink>
    </Container>
  );
};

OrderInfo.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  taxPercent: PropTypes.number.isRequired,
};

export default OrderInfo;
