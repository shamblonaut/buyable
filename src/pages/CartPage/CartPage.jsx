import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import { ProductCard } from "@/components";

import {
  Page,
  ProductList,
  Heading,
  Info,
  InfoTitle,
  CheckoutInfo,
  CheckoutDetails,
  CheckoutLink,
} from "./CartPage.styles";

const CartPage = () => {
  const { productsData, cart, setCart } = useOutletContext();

  const [subtotal, setSubtotal] = useState(0.0);

  useEffect(() => {
    if (!productsData) return;

    let sum = 0.0;
    productsData.forEach((product) => {
      if (cart[product.id]) {
        sum += product.price * cart[product.id];
      }
    });

    setSubtotal(sum);
  }, [productsData, cart]);

  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <Page>
      <Heading>Your Cart</Heading>
      {productsData && Object.keys(cart).length > 0 ? (
        <>
          <ProductList>
            {productsData
              .filter((product) =>
                Object.keys(cart).includes(product.id.toString()),
              )
              .map((product) => (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    cart={cart}
                    setCart={setCart}
                  />
                </li>
              ))}
          </ProductList>
          <CheckoutDetails>
            <InfoTitle>Order Summary</InfoTitle>
            <CheckoutInfo>
              <label>Subtotal: </label>
              <p>${subtotal}</p>
            </CheckoutInfo>
            <CheckoutInfo>
              <label>Tax (12%): </label>
              <p>${tax.toFixed(2)}</p>
            </CheckoutInfo>
            <CheckoutInfo>
              <label>Total Price: </label>
              <p>${total.toFixed(2)}</p>
            </CheckoutInfo>
            <CheckoutLink to="/disclaimer">
              <ShoppingBag /> Place Order
            </CheckoutLink>
          </CheckoutDetails>
        </>
      ) : (
        <Info>Your cart is empty</Info>
      )}
    </Page>
  );
};

export default CartPage;
