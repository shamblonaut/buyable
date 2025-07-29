import { Link } from "react-router-dom";
import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: 480px;

  color: var(--color-light);
  background-color: var(--color-accent);
  border: 3px solid var(--color-dark);
  border-radius: 8px;
  padding-bottom: 8px;
`;

export const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  flex: 1;

  background-color: white;
  border-bottom: 3px solid var(--color-dark);

  & img {
    max-width: 160px;
    max-height: 200px;
  }
`;

export const ProductDetails = styled.div`
  padding: 16px;
  padding-bottom: 0;
`;

export const ProductTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 700;

  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5em;
  height: 3em; /* 2 lines */
`;

export const ProductPrice = styled.p`
  font-family: var(--font-highlight);
  font-size: 1.25rem;
  font-weight: 500;
  margin: 8px 0;
`;
