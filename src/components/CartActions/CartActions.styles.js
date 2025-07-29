import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px;
  width: 75%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  color: var(--color-light);
  border: 2px solid var(--color-dark);
  border-radius: 4px;

  transition: all 200ms ease;
`;

export const AddButton = styled(Button)`
  background-color: var(--color-green);
  width: 100%;
  padding: 8px 32px;

  &:hover {
    background-color: var(--color-green-dark);
    color: var(--color-light);
  }

  & .lucide {
    margin-right: 8px;
  }
`;

export const RemoveButton = styled(Button)`
  margin-left: 8px;
  background-color: var(--color-red);

  &:hover {
    background-color: var(--color-red-dark);
    color: var(--color-light);
  }
`;
