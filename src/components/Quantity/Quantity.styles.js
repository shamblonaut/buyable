import styled from "styled-components";

export const Selector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  height: 100%;
  overflow: hidden;
  flex: 1;

  border: 2px solid var(--color-dark);
  border-radius: 4px;
`;

const Button = styled.button`
  outline: none;
  border: none;

  width: 100%;
  height: 100%;
  color: var(--color-light);

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 200ms ease;
`;

export const DecrementButton = styled(Button)`
  background-color: var(--color-red);
  border-right: 2px solid var(--color-dark);

  &:hover {
    background-color: var(--color-red-dark);
  }
`;

export const IncrementButton = styled(Button)`
  background-color: var(--color-green);
  border-left: 2px solid var(--color-dark);

  &:hover {
    background-color: var(--color-green-dark);
  }
`;

export const CurrentQuantity = styled.p`
  background-color: var(--color-light);
  padding: 4px;
  width: 48px;
  height: 100%;

  font-weight: 500;
  font-size: 1.1rem;
  text-align: center;
  color: var(--color-dark);

  display: flex;
  justify-content: center;
  align-items: center;
`;
