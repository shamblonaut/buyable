import styled from "styled-components";
import { LucideSearch } from "lucide-react";

export const Bar = styled.form`
  display: flex;
  align-items: center;
  margin: 16px;
  border: 1px solid grey;
  width: max-content;
  height: min-content;
  min-width: 80%;

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
