import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchBar from "./SearchBar";

const mockPrompt = "Mock Search Prompt";
const mockQuery = "Mock Query";
const mockSetQuery = vi.fn();

describe("SearchBar component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <SearchBar
        prompt={mockPrompt}
        query={mockQuery}
        setQuery={mockSetQuery}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("handles input properly", async () => {
    const user = userEvent.setup();

    let query = "";
    let setQuery = vi.spyOn(
      {
        setQuery: (newQuery) => {
          query = newQuery;
        },
      },
      "setQuery",
    );

    const component = (
      <SearchBar prompt={mockPrompt} query={query} setQuery={setQuery} />
    );

    const { rerender } = render(component);
    const searchInput = screen.getByRole("textbox", {
      name: "product-search-input",
    });

    expect(searchInput).toHaveValue("");

    await user.type(searchInput, "test query");
    rerender(component);

    waitFor(() => {
      expect(searchInput).toHaveValue("test query");
    });
  });
});
