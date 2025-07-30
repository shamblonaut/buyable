import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ProductType } from "@/utils/types";

import { Info } from "@/styles";
import {
  Container,
  ItemList,
  Item,
  ContentNavigator,
  CarouselDot,
  ProductLink,
  CarouselImage,
} from "./Carousel.styles";

const Carousel = ({ productsData }) => {
  const products = productsData.data?.slice(0, 10);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!products) return;

    const timer = setTimeout(() => {
      if (activeIndex === products.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [products, activeIndex]);

  return (
    <Container>
      {productsData.loading ? (
        <Info>Loading products...</Info>
      ) : productsData.error ? (
        <Info>
          <p>Could not load carousel :(</p>
          <p>Error: {productsData.error.message}</p>
        </Info>
      ) : (
        <>
          <ItemList $activeIndex={activeIndex}>
            {products.map((item) => (
              <Item key={item.id}>
                <ProductLink to={`/product/${item.id}`}>
                  <CarouselImage src={item.image} alt={item.title} />
                </ProductLink>
              </Item>
            ))}
          </ItemList>
          <ContentNavigator>
            {products.map((item, index) => (
              <CarouselDot
                $active={activeIndex === index}
                key={item.id}
                onClick={() => setActiveIndex(index)}
              ></CarouselDot>
            ))}
          </ContentNavigator>
        </>
      )}
    </Container>
  );
};

Carousel.propTypes = {
  productsData: PropTypes.exact({
    data: PropTypes.arrayOf(ProductType),
    error: PropTypes.instanceOf(Error),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Carousel;
