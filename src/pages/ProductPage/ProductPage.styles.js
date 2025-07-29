import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle(css`
  body {
    background-color: white;
  }
`);

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px;

  & img {
    width: auto;
    max-height: 30vh;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 16px;
  padding-top: 0;

  background-color: var(--color-background);
  border: 3px solid var(--color-dark);
  border-radius: 16px 16px 0 0;
  border-bottom: none;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

export const Notch = styled.div`
  margin: 6px auto;
  width: 80px;
  height: 12px;
  border: 3px solid var(--color-dark);
  border-radius: 6px;
  background-color: var(--color-light);
`;

export const Details = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.p`
  font-size: 1.75rem;
  font-weight: 700;
`;

export const Price = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  font-family: var(--font-highlight), sans-serif;
`;

export const Description = styled.p`
  font-size: 1.1rem;
`;

export const CartActionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: max(50%, 360px);
`;
