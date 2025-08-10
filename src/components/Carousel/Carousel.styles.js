import { Link } from "react-router-dom";
import styled from "styled-components";

import { Info as CommonInfo } from "@/styles";

export const Info = styled(CommonInfo)`
  flex: 1;
`;

export const Container = styled.div`
  position: relative;
  width: min(500px, 80%);
  min-height: 200px;
  overflow: hidden;
  padding: 16px;
  margin: 32px 0;

  background-color: white;
  border: 3px solid var(--color-dark);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ItemList = styled.ul`
  padding: 0;
  display: flex;
  list-style: none;
  min-width: min-content;
  transform: translateX(${(props) => props.$activeIndex * -100}%);
  transition: all 500ms ease-in-out;
`;

export const Item = styled.li`
  width: 100%;
  min-height: 160px;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentNavigator = styled.div`
  list-style: none;
  padding: 0;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 16px;
  align-items: center;
  justify-items: center;

  background-color: #00000080;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;

  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
`;

export const CarouselDot = styled.button`
  border: none;
  background: none;
  padding: 0;

  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) => (props.$active ? "8px" : "4px")};
    height: ${(props) => (props.$active ? "8px" : "4px")};
    background-color: ${(props) =>
      props.$active ? "var(--color-light)" : "var(--color-light-dimmer)"};
    border-radius: 50%;
  }

  &:hover::after {
    background-color: ${(props) =>
      props.$active ? "var(--color-light)" : "var(--color-light-dim)"};

    width: 8px;
    height: 8px;
  }
`;

export const ProductLink = styled(Link)`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CarouselImage = styled.img`
  width: auto;
  height: auto;
  max-width: 80%;
  max-height: 250px;
`;
