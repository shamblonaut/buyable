import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";

import { mockProductList } from "@tests/data";

import ProductFilters from "./ProductFilters";

const mockSetFilteredProducts = vi.spyOn(
  {
    setFilteredProducts: vi.fn(),
  },
  "setFilteredProducts",
);

describe("ProductFilters component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Clear search queries
    history.replaceState(history.state, null, window.location.pathname);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <ProductFilters
          products={mockProductList}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("shows all categories in category selector", () => {
    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProductList}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    const selectorOptions = within(
      screen.getByRole("combobox", { name: "Select product category" }),
    ).getAllByRole("option");

    expect(selectorOptions[0].value).toBe("all");
    expect(selectorOptions[1].value).toBe("Electronics");
    expect(selectorOptions[2].value).toBe("Accessories");
  });

  it("modifies query url param on search", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProductList}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Search for product" }),
      "product",
    );

    expect(window.location.search).toBe("?query=product");
  });

  it("filters products by matching search query with product titles", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProductList}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Search for product" }),
      "gb",
    );

    expect(mockSetFilteredProducts).toHaveBeenCalledWith([
      mockProductList[0],
      mockProductList[1],
      mockProductList[2],
    ]);
  });

  it("filters products by matching search query with categories", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProductList}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Search for product" }),
      "electronics",
    );

    expect(mockSetFilteredProducts).toHaveBeenCalledWith(
      mockProductList.slice(0, 5),
    );
  });

  it("filters by selected category", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProductList}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select product category" }),
      "all",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith(mockProductList);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select product category" }),
      "Electronics",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith(
      mockProductList.slice(0, 5),
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select product category" }),
      "Accessories",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith(
      mockProductList.slice(5, 10),
    );
  });

  it("filters by respective sorting methods", async () => {
    const user = userEvent.setup();

    const products = mockProductList.slice(0, 5);

    render(
      <BrowserRouter>
        <ProductFilters
          products={products}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select sorting method" }),
      "relevance",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith(products);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select sorting method" }),
      "cheap",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      products[4],
      products[2],
      products[3],
      products[1],
      products[0],
    ]);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select sorting method" }),
      "expensive",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      products[0],
      products[1],
      products[3],
      products[2],
      products[4],
    ]);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select sorting method" }),
      "best",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      products[3],
      products[1],
      products[0],
      products[4],
      products[2],
    ]);
  });

  it("adds together each filter to give a combined result", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProductList}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    // Select electronics category
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select product category" }),
      "Electronics",
    );

    // Search for titles with "gb"
    await user.type(
      screen.getByRole("textbox", { name: "Search for product" }),
      "gb",
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select sorting method" }),
      "cheap",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      mockProductList[2],
      mockProductList[1],
      mockProductList[0],
    ]);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select sorting method" }),
      "expensive",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      mockProductList[0],
      mockProductList[1],
      mockProductList[2],
    ]);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Select sorting method" }),
      "best",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      mockProductList[1],
      mockProductList[0],
      mockProductList[2],
    ]);
  });
});
