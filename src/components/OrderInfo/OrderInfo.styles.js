import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  border: 3px solid var(--color-dark);
  border-radius: 8px;
  padding: 0 32px;
  margin-bottom: 32px;
  padding-bottom: 0;
  width: 100%;
  max-width: 600px;

  background-color: var(--color-accent-dark);
  color: var(--color-light);

  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-highlight);
  margin: 16px 0;
`;

export const Field = styled.span`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;

  font-family: var(--font-highlight);
  font-size: 1.25rem;
  font-weight: 700;

  & label {
    font-family: var(--font-normal);
    margin-right: 8px;
  }
`;

export const CheckoutLink = styled(Link)`
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
