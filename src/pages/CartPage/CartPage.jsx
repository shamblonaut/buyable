import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { CartContext } from "@/contexts";

import { OrderInfo, ProductList } from "@/components";
import { Page, Heading, Info } from "@/styles";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  const { productsData, setAppPosition } = useOutletContext();

  useEffect(() => setAppPosition(AppPosition.CART), [setAppPosition]);

  const getCartProductList = () => {
    return products.filter((product) =>
      Object.keys(cart).includes(product.id.toString()),
    );
  };

  const products = productsData.data;
  return (
    <Page>
      <Heading>Your Cart</Heading>
      {productsData.loading ? (
        <Info>Loading products...</Info>
      ) : !products || productsData.error ? (
        <Info>
          Could not load products
          {productsData.error?.message && (
            <>
              :
              <br />
              {productsData.error.message}
            </>
          )}
        </Info>
      ) : Object.keys(cart).length > 0 ? (
        <>
          <OrderInfo products={products} taxPercent={12} />
          <ProductList products={getCartProductList()} filterable={false} />
        </>
      ) : (
        <Info>Your cart is empty</Info>
      )}
    </Page>
  );
};

export default CartPage;
