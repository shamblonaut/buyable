import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { CartContext } from "@/contexts";

import { mockProductList } from "@tests/data";

import ProductList from "./ProductList";

const mockCart = { 1: 1, 3: 2, 5: 5, 7: 13, 9: 34 };
const mockDispatchCartAction = vi.fn();

vi.mock(
  "@/components/ProductCard/ProductCard.styles",
  async (importOriginal) => {
    const actual = await importOriginal();

    const { ProductLink } = actual;
    return {
      ...actual,
      ProductLink: ({ children, ...props }) => (
        <ProductLink data-testid="product-link" {...props}>
          {children}
        </ProductLink>
      ),
    };
  },
);

describe("ProductList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Clear search queries
    history.replaceState(history.state, null, window.location.pathname);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <CartContext.Provider
          value={{ cart: mockCart, dispatchCartAction: mockDispatchCartAction }}
        >
          <ProductList products={mockProductList} />
        </CartContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("does not show product filters when it is disabled", () => {
    const { rerender } = render(
      <BrowserRouter>
        <CartContext.Provider
          value={{ cart: mockCart, dispatchCartAction: mockDispatchCartAction }}
        >
          <ProductList products={mockProductList} />
        </CartContext.Provider>
      </BrowserRouter>,
    );

    expect(screen.queryByLabelText("Search for product")).toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <CartContext.Provider
          value={{ cart: mockCart, dispatchCartAction: mockDispatchCartAction }}
        >
          <ProductList products={mockProductList} filterable={false} />
        </CartContext.Provider>
      </BrowserRouter>,
    );

    expect(
      screen.queryByLabelText("Search for product"),
    ).not.toBeInTheDocument();
  });

  it("shows message if no products are found", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider
          value={{ cart: mockCart, dispatchCartAction: mockDispatchCartAction }}
        >
          <ProductList products={[]} />
        </CartContext.Provider>
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
        <CartContext.Provider
          value={{ cart: mockCart, dispatchCartAction: mockDispatchCartAction }}
        >
          <ProductList products={mockProductList} />
        </CartContext.Provider>
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
        <CartContext.Provider
          value={{ cart: mockCart, dispatchCartAction: mockDispatchCartAction }}
        >
          <ProductList products={mockProductList} />
        </CartContext.Provider>
      </BrowserRouter>,
    );

    expect(
      within(screen.getByRole("list")).getAllByTestId("product-link").length,
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
        <CartContext.Provider
          value={{ cart: mockCart, dispatchCartAction: mockDispatchCartAction }}
        >
          <ProductList products={mockProductList} />
        </CartContext.Provider>
      </BrowserRouter>,
    );

    expect(
      within(screen.getByRole("list")).getAllByTestId("product-link").length,
    ).toBe(5);
  });
});
