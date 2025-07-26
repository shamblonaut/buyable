import { Link } from "react-router-dom";
import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  border: 2px solid black;
`;

export const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
  flex: 1;

  & img {
    width: 100%;
    max-width: 160px;
  }
`;

export const ProductTitle = styled.p`
  font-weight: 500;

  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  line-height: 1.5em;
  height: 4.5em; /* 3 lines */
`;

export const CartActions = styled.div`
  padding-top: 16px;
`;

export const CartButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;

  & .lucide {
    width: 20px;
    height: auto;
    margin-right: 8px;
  }
`;
