import PropTypes from "prop-types";

import { Bar, SearchIcon, Input } from "./SearchBar.styles";

const SearchBar = ({ prompt, query, setQuery }) => {
  const handleSearchInput = (event) => setQuery(event.target.value);

  return (
    <Bar>
      <SearchIcon />
      <Input
        type="text"
        placeholder={prompt ?? ""}
        value={query}
        onChange={handleSearchInput}
      />
    </Bar>
  );
};

SearchBar.propTypes = {
  prompt: PropTypes.string,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;
