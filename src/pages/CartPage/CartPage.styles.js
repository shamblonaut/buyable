import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductList = styled.ul`
  list-style: none;
  padding: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
`;

export const Heading = styled.h2`
  text-align: center;
  margin-bottom: 16px;
`;

export const Info = styled.p`
  text-align: center;
`;

export const Price = styled.span`
  font-family: Montserrat, sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const ButtonLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin: 16px;
  width: max-content;
`;

export const CheckoutButton = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;

  & .lucide {
    width: 20px;
    height: auto;
    margin-right: 8px;
  }
`;
