import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import PropTypes from "prop-types";

import { ProductType } from "@/utils/types";

import { Container, Title, Field, CheckoutLink } from "./OrderInfo.styles";

const OrderInfo = ({ products, cart, setCart }) => {
  const [subtotal, setSubtotal] = useState(0.0);

  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const clearCart = () => {
    setCart({});
  };

  useEffect(() => {
    if (!products) return;

    let sum = 0.0;
    products.forEach((product) => {
      if (cart[product.id]) {
        sum += product.price * cart[product.id];
      }
    });

    setSubtotal(sum);
  }, [products, cart]);

  if (!products) return;
  return (
    <Container>
      <Title>Order Summary</Title>
      <Field>
        <label>Subtotal: </label>
        <p>${subtotal.toFixed(2)}</p>
      </Field>
      <Field>
        <label>Tax (12%): </label>
        <p>${tax.toFixed(2)}</p>
      </Field>
      <Field>
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
  products: PropTypes.arrayOf(ProductType),
  cart: PropTypes.objectOf(PropTypes.number).isRequired,
  setCart: PropTypes.func.isRequired,
};

export default OrderInfo;
