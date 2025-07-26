import styled from "styled-components";
import { LucideSearch } from "lucide-react";

export const Bar = styled.form`
  display: flex;
  align-items: center;
  margin: 16px;
  border: 1px solid grey;
  border-radius: 4px;
  height: min-content;
`;

export const SearchIcon = styled(LucideSearch)`
  margin: 8px;
`;

export const Input = styled.input`
  appearance: none;
  border: none;
  outline: none;

  flex: 1;
  padding: 8px;
  border-radius: inherit;
`;
