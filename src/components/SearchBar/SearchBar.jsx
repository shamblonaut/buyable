import { Bar, SearchIcon, Input } from "./SearchBar.styles";

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
