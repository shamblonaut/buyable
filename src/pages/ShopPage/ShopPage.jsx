import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { SearchBar, ProductCard } from "@/components";

import { Page, ProductList, Info } from "./ShopPage.styles";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") ?? "",
  );
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    productsData,
    productsError,
    productsLoading,
    cart,
    setCart,
    setAppPosition,
  } = useOutletContext();

  useEffect(() => setAppPosition(AppPosition.SHOP), [setAppPosition]);

  useEffect(() => {
    if (!searchQuery && productsData) {
      setFilteredProducts(productsData);
      setSearchParams({});
      return;
    } else if (productsData) {
      setFilteredProducts(
        productsData.filter(
          (product) =>
            searchQuery === "" ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.includes(searchQuery.toLowerCase()),
        ),
      );
      setSearchParams({ query: searchQuery });
    }
  }, [searchQuery, productsData, setSearchParams]);

  return (
    <Page>
      <SearchBar
        prompt="Search Product"
        query={searchQuery}
        setQuery={setSearchQuery}
      />
      {productsLoading ? (
        <Info>Loading products...</Info>
      ) : productsError ? (
        <Info>
          Error while fetching products:
          <br />
          {productsError.message}
        </Info>
      ) : filteredProducts.length > 0 ? (
        <ProductList>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} cart={cart} setCart={setCart} />
            </li>
          ))}
        </ProductList>
      ) : (
        searchQuery && <Info>No products found for "{searchQuery}"</Info>
      )}
    </Page>
  );
};

export default ShopPage;
