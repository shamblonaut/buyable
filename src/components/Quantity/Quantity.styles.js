import styled from "styled-components";

export const Selector = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px 0;
`;

export const Button = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;

  & .lucide {
    width: 20px;
    height: auto;
  }
`;

export const CurrentQuantity = styled.p`
  font-weight: 500;
  font-size: 1.1rem;
`;
