import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import { ProductCard } from "@/components";

import {
  Page,
  ProductList,
  Heading,
  Info,
  Price,
  ButtonLink,
  CheckoutButton,
} from "./CartPage.styles";

const CartPage = () => {
  const { productsData, cart, setCart } = useOutletContext();

  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    if (!productsData) return;

    let sum = 0.0;
    productsData.forEach((product) => {
      if (cart[product.id]) {
        sum += product.price * cart[product.id];
      }
    });

    setTotalPrice(sum.toFixed(2));
  }, [productsData, cart]);

  return (
    <Page>
      <Heading>Your Cart</Heading>
      {productsData && Object.keys(cart).length > 0 ? (
        <>
          <Info>
            Total Price: <Price>${totalPrice}</Price>
          </Info>
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
          <ButtonLink to="/checkout">
            <CheckoutButton>
              <ShoppingBag /> Order Checkout
            </CheckoutButton>
          </ButtonLink>
        </>
      ) : (
        <Info>Your cart is empty</Info>
      )}
    </Page>
  );
};

export default CartPage;
