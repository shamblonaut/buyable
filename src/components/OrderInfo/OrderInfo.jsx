import { ShoppingBag } from "lucide-react";
import PropTypes from "prop-types";

import { Container, Title, Field, CheckoutLink } from "./OrderInfo.styles";

const OrderInfo = ({ products, cart, setCart, taxPercent }) => {
  const subtotal = products.reduce(
    (sum, product) =>
      cart[product.id] ? sum + product.price * cart[product.id] : sum,
    0,
  );
  const tax = subtotal * (taxPercent / 100);
  const total = subtotal + tax;

  const clearCart = () => {
    setCart({});
  };

  return (
    <Container>
      <Title>Order Summary</Title>
      <Field aria-label="subtotal-field">
        <label>Subtotal: </label>
        <p>${subtotal.toFixed(2)}</p>
      </Field>
      <Field aria-label="tax-field">
        <label>Tax (12%): </label>
        <p>${tax.toFixed(2)}</p>
      </Field>
      <Field aria-label="total-price-field">
        <label>Total Price: </label>
        <p>${total.toFixed(2)}</p>
      </Field>
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
  cart: PropTypes.objectOf(PropTypes.number).isRequired,
  setCart: PropTypes.func.isRequired,
  taxPercent: PropTypes.number.isRequired,
};

export default OrderInfo;
