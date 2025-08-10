import { LucideSearch } from "lucide-react";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export const SearchBar = styled.form`
  display: flex;
  align-items: center;
  margin: 16px;
  border: 1px solid grey;
  width: 80%;
  height: min-content;
  min-width: 360px;

  background-color: var(--color-light);
  border: 3px solid var(--color-dark);
  border-radius: 4px;
`;

export const SearchIcon = styled(LucideSearch)`
  margin: 8px;
`;

export const Input = styled.input`
  appearance: none;
  border: none;
  outline: none;
  background: none;
  color: inherit;

  flex: 1;
  padding: 8px;
  border-radius: inherit;
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
