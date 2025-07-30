import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { OrderInfo, ProductCard } from "@/components";

import { Page, Heading, Info } from "@/styles";

import { ProductList } from "./CartPage.styles";

const CartPage = () => {
  const { productsData, cart, setCart, setAppPosition } = useOutletContext();

  const products = productsData.data;

  useEffect(() => setAppPosition(AppPosition.CART), [setAppPosition]);

  return (
    <Page>
      <Heading>Your Cart</Heading>
      {products && Object.keys(cart).length > 0 ? (
        <>
          <OrderInfo products={products} cart={cart} setCart={setCart} />
          <ProductList>
            {products
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
    </Page>
  );
};

export default CartPage;
