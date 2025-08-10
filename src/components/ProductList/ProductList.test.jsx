import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { mockProductList } from "@tests/data";

import ProductList from "./ProductList";

const mockCart = { 1: 1, 3: 2, 5: 5, 7: 13, 9: 34 };
const mockSetCart = vi.fn();

describe("ProductList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Clear search queries
    history.replaceState(history.state, null, window.location.pathname);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <ProductList
          products={mockProductList}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("does not show product filters when it is disabled", () => {
    const { rerender } = render(
      <BrowserRouter>
        <ProductList
          products={mockProductList}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(screen.queryByLabelText("product-search-input")).toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <ProductList
          products={mockProductList}
          cart={mockCart}
          setCart={mockSetCart}
          filterable={false}
        />
      </BrowserRouter>,
    );

    expect(
      screen.queryByLabelText("product-search-input"),
    ).not.toBeInTheDocument();
  });

  it("shows message if no products are found", () => {
    render(
      <BrowserRouter>
        <ProductList products={[]} cart={mockCart} setCart={mockSetCart} />
      </BrowserRouter>,
    );

    expect(
      screen.getByText("no products found", { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows appropriate message when no products are found for search query", () => {
    const searchQuery = "proust";
    history.replaceState(
      history.state,
      null,
      `${window.location.pathname}?query=${searchQuery}`,
    );

    render(
      <BrowserRouter>
        <ProductList
          products={mockProductList}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(
      screen.getByText(`no products found for "${searchQuery}"`, {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it("shows all products in a list if not filtered", () => {
    render(
      <BrowserRouter>
        <ProductList
          products={mockProductList}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(
      within(screen.getByRole("list")).getAllByRole("link", {
        name: "product-link",
      }).length,
    ).toBe(mockProductList.length);
  });

  it("shows only the filtered products if a search query is present", () => {
    const searchQuery = "Electronics";
    history.replaceState(
      history.state,
      null,
      `${window.location.pathname}?query=${searchQuery}`,
    );

    render(
      <BrowserRouter>
        <ProductList
          products={mockProductList}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(
      within(screen.getByRole("list")).getAllByRole("link", {
        name: "product-link",
      }).length,
    ).toBe(5);
  });
});
