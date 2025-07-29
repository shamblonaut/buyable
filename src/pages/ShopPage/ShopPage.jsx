import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { SearchBar, ProductCard } from "@/components";

import { Page, Info } from "@/styles";

import {
  Controls,
  CategoryControl,
  SortControl,
  ControlLabel,
  Dropdown,
  ProductList,
} from "./ShopPage.styles";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") ?? "",
  );
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [displayProducts, setDisplayProducts] = useState([]);

  const { productsData, cart, setCart, setAppPosition } = useOutletContext();

  const products = productsData.data;

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => setAppPosition(AppPosition.SHOP), [setAppPosition]);

  useEffect(() => {
    if (!products) return;

    const categoryFilter = products.filter(
      (product) => category === "all" || product.category === category,
    );

    const searchFilter = categoryFilter.filter(
      (product) =>
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.includes(searchQuery.toLowerCase()),
    );

    let sortedProducts = searchFilter;
    switch (sortBy) {
      case "cheap":
        sortedProducts = searchFilter.sort(
          (productA, productB) => productA.price - productB.price,
        );
        break;
      case "expensive":
        sortedProducts = searchFilter.sort(
          (productA, productB) => productB.price - productA.price,
        );
        break;
      case "best":
        sortedProducts = searchFilter.sort(
          (productA, productB) => productB.rating.rate - productA.rating.rate,
        );
        break;
    }

    setDisplayProducts(sortedProducts);

    setSearchParams(searchQuery ? { query: searchQuery } : {});
  }, [searchQuery, products, category, sortBy, setSearchParams]);

  return (
    <Page>
      <SearchBar
        prompt="Search Product"
        query={searchQuery}
        setQuery={setSearchQuery}
      />
      <Controls>
        <CategoryControl>
          <ControlLabel htmlFor="category">Category: </ControlLabel>
          <Dropdown
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewellery</option>
          </Dropdown>
        </CategoryControl>
        <SortControl>
          <ControlLabel htmlFor="sort">Sort By: </ControlLabel>
          <Dropdown name="sort" value={sortBy} onChange={handleSortByChange}>
            <option value="relevance">Relevance</option>
            <option value="cheap">Price: Low to High</option>
            <option value="expensive">Price: High to Low</option>
            <option value="best">Best Rating</option>
          </Dropdown>
        </SortControl>
      </Controls>
      {productsData.loading ? (
        <Info>Loading products...</Info>
      ) : productsData.error ? (
        <Info>
          Could not load products:
          <br />
          {productsData.error.message}
        </Info>
      ) : displayProducts.length > 0 ? (
        <ProductList>
          {displayProducts.map((product) => (
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
