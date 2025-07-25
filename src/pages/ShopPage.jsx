import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard.jsx";

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
  margin-bottom: 64px;
`;

const Info = styled.p`
  text-align: center;
`;

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") ?? "",
  );
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { productsData, productsError, productsLoading } = useOutletContext();

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
        <Info>Loading Products...</Info>
      ) : productsError ? (
        <Info>
          Error while fetching products:
          <br />
          {productsError}
        </Info>
      ) : filteredProducts.length > 0 ? (
        <ProductList>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
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
