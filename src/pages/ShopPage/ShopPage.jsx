import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { SearchBar, ProductCard } from "@/components";

import { Page, Info } from "@/styles";

import { ProductList } from "./ShopPage.styles";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") ?? "",
  );
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { productsData, cart, setCart, setAppPosition } = useOutletContext();

  const products = productsData.data;

  useEffect(() => setAppPosition(AppPosition.SHOP), [setAppPosition]);

  useEffect(() => {
    if (!searchQuery && products) {
      setFilteredProducts(products);
      setSearchParams({});
      return;
    } else if (products) {
      setFilteredProducts(
        products.filter(
          (product) =>
            searchQuery === "" ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.includes(searchQuery.toLowerCase()),
        ),
      );
      setSearchParams({ query: searchQuery });
    }
  }, [searchQuery, products, setSearchParams]);

  return (
    <Page>
      <SearchBar
        prompt="Search Product"
        query={searchQuery}
        setQuery={setSearchQuery}
      />
      {productsData.loading ? (
        <Info>Loading products...</Info>
      ) : productsData.error ? (
        <Info>
          Could not load products:
          <br />
          {productsData.error.message}
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
