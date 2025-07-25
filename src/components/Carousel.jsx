import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 16px;
  border: 2px solid black;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  min-width: min-content;
  transform: translateX(${(props) => props.$activeIndex * -100}%);
  transition: all 500ms ease-in-out;
`;

const Item = styled.li`
  min-width: 100%;
  min-height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarouselDots = styled.div`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  background-color: #00000080;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;

  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
`;

const CarouselDot = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  padding: 0;
  background-color: ${(props) => (props.$active ? "#efefef" : "#efefef40")};
  width: ${(props) => (props.$active ? "8px" : "4px")};
  height: ${(props) => (props.$active ? "8px" : "4px")};
  border-radius: 50%;
  margin: 4px;

  &:hover {
    background-color: ${(props) => (props.$active ? "#efefef" : "#efefef80")};
    width: 8px;
    height: 8px;
  }
`;

const CarouselLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarouselImage = styled.img`
  width: auto;
  height: auto;
  max-width: 80%;
  max-height: 250px;
`;

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
            <CarouselLink to={`/product/${item.id}`}>
              <CarouselImage src={item.image} alt={item.title} />
            </CarouselLink>
          </Item>
        ))}
      </ItemList>
      <CarouselDots>
        {items.map((item, index) => (
          <CarouselDot
            $active={activeIndex === index}
            key={item.id}
            onClick={() => setActiveIndex(index)}
          ></CarouselDot>
        ))}
      </CarouselDots>
    </Container>
  );
};

export default Carousel;
