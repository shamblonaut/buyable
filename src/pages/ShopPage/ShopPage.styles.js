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

export const Info = styled.p`
  flex: 0.5;
  max-width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
`;
