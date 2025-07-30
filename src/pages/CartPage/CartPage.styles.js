import styled from "styled-components";

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
