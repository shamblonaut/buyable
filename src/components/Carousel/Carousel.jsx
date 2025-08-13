import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

import {
  Info,
  Container,
  ItemList,
  Item,
  ProductLink,
  ImageContainer,
  CarouselImage,
  ProductDetails,
  ProductTitle,
  CarouselControl,
  CarouselNavigator,
  CarouselDot,
  CarouselArrow,
} from "./Carousel.styles";

const Carousel = ({ productsData, itemCount }) => {
  const products = productsData.data?.slice(
    0,
    itemCount
      ? Math.min(itemCount, productsData.data?.length)
      : productsData.data?.length,
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const activatePreviousSlide = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? products.length - 1 : currentIndex - 1,
    );
  };
  const activateNextSlide = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === products.length - 1 ? 0 : currentIndex + 1,
    );
  };

  useEffect(() => {
    if (!products) return;

    const timer = setTimeout(activateNextSlide, 5000);

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
          <ItemList $activeIndex={activeIndex}>
            {products.map((product) => (
              <Item key={product.id}>
                <ProductLink to={`/product/${product.id}`}>
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
          <CarouselControl>
            <CarouselArrow
              aria-label="Go to previous slide"
              onClick={activatePreviousSlide}
            >
              <ChevronLeft />
            </CarouselArrow>
            <CarouselNavigator>
              {products.map((item, index) => (
                <CarouselDot
                  $active={activeIndex === index}
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                ></CarouselDot>
              ))}
            </CarouselNavigator>
            <CarouselArrow
              aria-label="Go to next slide"
              onClick={activateNextSlide}
            >
              <ChevronRight />
            </CarouselArrow>
          </CarouselControl>
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
