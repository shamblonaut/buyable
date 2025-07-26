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

export const Info = styled.p`
  text-align: center;
`;
