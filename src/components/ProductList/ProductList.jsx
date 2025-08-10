import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { ProductFilters, ProductCard } from "@/components";
import { Info } from "@/styles";
import { Container, List } from "./ProductList.styles";

const ProductList = ({ products, cart, setCart, filterable = true }) => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!filterable) {
      setFilteredProducts(products);
    }
  }, [products, filterable]);

  const searchQuery = searchParams.get("query");
  return (
    <Container>
      {filterable && (
        <ProductFilters
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      )}
      <List>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} cart={cart} setCart={setCart} />
            </li>
          ))
        ) : (
          <Info>No products found{searchQuery && ` for "${searchQuery}"`}</Info>
        )}
      </List>
    </Container>
  );
};

ProductList.propTypes = {
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
  cart: PropTypes.objectOf(PropTypes.number).isRequired,
  setCart: PropTypes.func.isRequired,
  filterable: PropTypes.bool,
};

export default ProductList;
