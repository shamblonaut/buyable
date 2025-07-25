import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ShoppingBag } from "lucide-react";

import ProductCard from "../components/ProductCard";

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  gap: 16px;
  margin-bottom: 32px;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 16px;
`;

const Info = styled.p`
  text-align: center;
`;

const Price = styled.span`
  font-family: Montserrat, sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
`;

const ButtonLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin: 16px;
  width: max-content;
`;

const CheckoutButton = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;

  & .lucide {
    width: 20px;
    height: auto;
    margin-right: 8px;
  }
`;

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

    setTotalPrice(sum);
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
