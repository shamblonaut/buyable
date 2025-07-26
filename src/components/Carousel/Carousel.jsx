import { useEffect, useState } from "react";

import {
  Container,
  ItemList,
  Item,
  ContentNavigator,
  CarouselDot,
  ProductLink,
  CarouselImage,
} from "./Carousel.styles";

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeIndex === items.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [items, activeIndex]);

  return (
    <Container>
      <ItemList $activeIndex={activeIndex}>
        {items.map((item) => (
          <Item key={item.id}>
            <ProductLink to={`/product/${item.id}`}>
              <CarouselImage src={item.image} alt={item.title} />
            </ProductLink>
          </Item>
        ))}
      </ItemList>
      <ContentNavigator>
        {items.map((item, index) => (
          <CarouselDot
            $active={activeIndex === index}
            key={item.id}
            onClick={() => setActiveIndex(index)}
          ></CarouselDot>
        ))}
      </ContentNavigator>
    </Container>
  );
};

export default Carousel;
