import styled from "styled-components";
import { Search as LucideSearch } from "lucide-react";

const Bar = styled.form`
  display: flex;
  align-items: center;
  margin: 16px;
  border: 1px solid grey;
  border-radius: 4px;
  height: min-content;
`;

const SearchIcon = styled(LucideSearch)`
  margin: 8px;
`;

const Input = styled.input`
  appearance: none;
  border: none;
  outline: none;

  flex: 1;
  padding: 8px;
  border-radius: inherit;
`;

const SearchBar = ({ prompt, query, setQuery }) => {
  const handleSearchInput = (event) => setQuery(event.target.value);

  return (
    <Bar>
      <SearchIcon />
      <Input
        type="text"
        placeholder={prompt}
        value={query}
        onChange={handleSearchInput}
      />
    </Bar>
  );
};

export default SearchBar;
