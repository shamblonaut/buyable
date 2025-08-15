import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { ProductList } from "@/components";
import { Page } from "@/styles";
import { Info } from "./ShopPage.styles";

const ShopPage = () => {
  const { productsData, setAppPosition } = useOutletContext();

  useEffect(() => setAppPosition(AppPosition.SHOP), [setAppPosition]);

  return (
    <Page>
      {productsData.loading ? (
        <Info>Loading products...</Info>
      ) : productsData.error || !productsData.data ? (
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
      ) : (
        productsData.data && <ProductList products={productsData.data} />
      )}
    </Page>
  );
};

export default ShopPage;
