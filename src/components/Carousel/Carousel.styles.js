import { Link } from "react-router-dom";
import styled from "styled-components";

import { Info as CommonInfo } from "@/styles";

export const Info = styled(CommonInfo)`
  flex: 1;
  font-weight: 500;
  color: var(--color-light);
`;

export const Container = styled.div`
  margin-top: 16px;

  position: relative;
  width: min(500px, 80%);
  height: 36vh;
  overflow: hidden;

  background-color: white;
  border: 3px solid var(--color-dark);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-accent);
`;

export const ItemList = styled.ul`
  padding: 0;
  display: flex;
  list-style: none;
  width: 100%;
  height: 100%;
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

export const ProductLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const CarouselImage = styled.img`
  width: auto;
  height: auto;
  max-height: 80%;
`;

export const ProductDetails = styled.div`
  border-top: 3px solid var(--color-dark);

  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 32px;
`;

export const ProductTitle = styled.p`
  width: 90%;

  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-light);

  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5em;
  height: 3em; /* 2 lines */
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
