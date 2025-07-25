import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

import ProductCard from "../components/ProductCard";

const ProductList = styled.ul`
  list-style: none;
  padding: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  gap: 16px;
  margin-bottom: 64px;
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
    <main>
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
        </>
      ) : (
        <Info>Your cart is empty</Info>
      )}
    </main>
  );
};

export default CartPage;
