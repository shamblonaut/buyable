import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`;

export const ProductList = styled.ul`
  list-style: none;
  padding: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 360px);
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
`;

export const Heading = styled.p`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 16px 0;
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 0.5;

  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
`;

export const CheckoutDetails = styled.div`
  border: 3px solid var(--color-dark);
  border-radius: 8px;
  padding: 0 32px;
  margin-bottom: 32px;
  padding-bottom: 0;
  width: 90%;
  max-width: 600px;

  background-color: var(--color-accent-dark);
  color: var(--color-light);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-highlight);
  text-align: center;
  margin: 16px 0;
`;

export const CheckoutInfo = styled.span`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  width: 100%;

  font-family: var(--font-highlight);
  font-size: 1.25rem;
  font-weight: 700;

  & label {
    font-family: var(--font-normal);
    margin-right: 8px;
  }
`;

export const CheckoutLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 32px 0;
  padding: 8px 16px;
  font-size: 1.25rem;
  font-weight: 500;

  background-color: var(--color-green-dark);
  color: var(--color-light);
  border: 2px solid var(--color-dark);
  border-radius: 4px;

  transition: all 200ms ease;

  &:active {
    transform: scale(0.95);
  }

  & .lucide {
    width: 20px;
    height: auto;
    margin-right: 8px;
  }
`;
