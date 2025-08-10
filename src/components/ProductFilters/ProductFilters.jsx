import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { toTitleCase } from "@/utils/helpers";

import {
  CategoryControl,
  Container,
  ControlLabel,
  Controls,
  Dropdown,
  Input,
  SearchBar,
  SearchIcon,
  SortControl,
} from "./ProductFilters.styles";

const ProductFilters = ({ products, setFilteredProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") ?? "",
  );
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    const categoryFilter = products.filter(
      (product) => category === "all" || product.category === category,
    );
    const searchFilter = categoryFilter.filter(
      (product) =>
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
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

    setFilteredProducts(sortedProducts);

    setSearchParams(searchQuery ? { query: searchQuery } : {});
  }, [
    products,
    searchQuery,
    category,
    sortBy,
    setSearchParams,
    setFilteredProducts,
  ]);

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const getCategories = () => {
    const categories = [];
    for (const product of products) {
      if (!categories.includes(product.category)) {
        categories.push(product.category.toString());
      }
    }
    return categories;
  };

  return (
    <Container>
      <SearchBar>
        <SearchIcon />
        <Input
          type="text"
          aria-label="product-search-input"
          placeholder="Search Product"
          value={searchQuery}
          onChange={handleSearchInput}
        />
      </SearchBar>
      <Controls>
        <CategoryControl>
          <ControlLabel htmlFor="category-selector">Category: </ControlLabel>
          <Dropdown
            id="category-selector"
            aria-label="category-selector"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            {getCategories().map((category) => (
              <option value={category} key={category}>
                {toTitleCase(category)}
              </option>
            ))}
          </Dropdown>
        </CategoryControl>
        <SortControl>
          <ControlLabel htmlFor="sort-selector">Sort By: </ControlLabel>
          <Dropdown
            id="sort-selector"
            aria-label="sort-selector"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value="relevance">Relevance</option>
            <option value="cheap">Price: Low to High</option>
            <option value="expensive">Price: High to Low</option>
            <option value="best">Best Rating</option>
          </Dropdown>
        </SortControl>
      </Controls>
    </Container>
  );
};

ProductFilters.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      rating: PropTypes.exact({
        rate: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  ),
  setFilteredProducts: PropTypes.func.isRequired,
};

export default ProductFilters;
