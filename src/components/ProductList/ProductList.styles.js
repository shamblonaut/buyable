import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const List = styled.ul`
  list-style: none;
  width: 100%;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 360px);
  justify-content: center;
  gap: 16px;
`;
