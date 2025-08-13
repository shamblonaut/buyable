import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Info,
  Container,
  ItemList,
  Item,
  ContentNavigator,
  CarouselDot,
  ProductLink,
  ImageContainer,
  CarouselImage,
  ProductDetails,
  ProductTitle,
} from "./Carousel.styles";

const Carousel = ({ productsData, itemCount }) => {
  const products = productsData.data?.slice(
    0,
    itemCount
      ? Math.min(itemCount, productsData.data?.length)
      : productsData.data?.length,
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!products) return;

    const timer = setTimeout(() => {
      setActiveIndex((previousIndex) =>
        previousIndex === products.length - 1 ? 0 : previousIndex + 1,
      );
    }, 5000);

    return () => clearTimeout(timer);
  });

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
          <ItemList $activeIndex={activeIndex} aria-label="carousel-image-list">
            {products.map((product) => (
              <Item key={product.id}>
                <ProductLink
                  to={`/product/${product.id}`}
                  aria-label="product-link"
                >
                  <ImageContainer>
                    <CarouselImage src={product.image} alt={product.title} />
                  </ImageContainer>
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                  </ProductDetails>
                </ProductLink>
              </Item>
            ))}
          </ItemList>
          <ContentNavigator>
            {products.map((item, index) => (
              <CarouselDot
                $active={activeIndex === index}
                key={item.id}
                aria-label="carousel-navigation-button"
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
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }),
    ),
    error: PropTypes.instanceOf(Error),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  itemCount: PropTypes.number,
};

export default Carousel;
