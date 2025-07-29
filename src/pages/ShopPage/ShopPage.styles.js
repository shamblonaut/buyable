import styled from "styled-components";

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 360px;
  width: 80%;
`;

const ControlField = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const CategoryControl = ControlField;

export const SortControl = styled(ControlField)`
  justify-content: flex-end;
`;

export const ControlLabel = styled.label`
  font-weight: 500;
`;

export const Dropdown = styled.select`
  color: var(--color-light);
  border: 3px solid var(--color-dark);
  border-radius: 4px;
  background-color: var(--color-accent);
  padding: 4px 8px;

  font-family: var(--font-highlight);
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
