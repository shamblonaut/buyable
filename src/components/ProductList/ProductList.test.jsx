import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import ProductList from "./ProductList";

const mockProducts = [
  {
    id: 1,
    price: 1023,
    title: "Product 1",
    image: "http://example.com/image-1.jpg",
    category: "Category 1",
    rating: { rate: 4.8, count: 256 },
  },
  {
    id: 2,
    price: 511,
    title: "Product 2",
    image: "http://example.com/image-2.jpg",
    category: "Category 1",
    rating: { rate: 4.8, count: 256 },
  },
  {
    id: 3,
    price: 255,
    title: "Product 3",
    image: "http://example.com/image-3.jpg",
    category: "Category 1",
    rating: { rate: 4.8, count: 256 },
  },
  {
    id: 4,
    price: 127,
    title: "Product 4",
    image: "http://example.com/image-4.jpg",
    category: "Category 1",
    rating: { rate: 4.8, count: 256 },
  },
  {
    id: 5,
    price: 63.49,
    title: "Product 5",
    image: "http://example.com/image-5.jpg",
    category: "Category 1",
    rating: { rate: 4.8, count: 256 },
  },
  {
    id: 6,
    price: 31.49,
    title: "Product 6",
    image: "http://example.com/image-6.jpg",
    category: "Category 2",
    rating: { rate: 3.2, count: 64 },
  },
  {
    id: 7,
    price: 15.49,
    title: "Product 7",
    image: "http://example.com/image-7.jpg",
    category: "Category 2",
    rating: { rate: 3.2, count: 64 },
  },
  {
    id: 8,
    price: 7.99,
    title: "Product 8",
    image: "http://example.com/image-8.jpg",
    category: "Category 2",
    rating: { rate: 3.2, count: 64 },
  },
  {
    id: 9,
    price: 3.99,
    title: "Product 9",
    image: "http://example.com/image-9.jpg",
    category: "Category 2",
    rating: { rate: 3.2, count: 64 },
  },
  {
    id: 10,
    price: 1.99,
    title: "Product 10",
    image: "http://example.com/image-10.jpg",
    category: "Category 2",
    rating: { rate: 3.2, count: 64 },
  },
];
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
          products={mockProducts}
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
          products={mockProducts}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(screen.queryByLabelText("product-search-input")).toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <ProductList
          products={mockProducts}
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
          products={mockProducts}
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
          products={mockProducts}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(
      within(screen.getByRole("list")).getAllByRole("link", {
        name: "product-link",
      }).length,
    ).toBe(mockProducts.length);
  });

  it("shows only the filtered products if a search query is present", () => {
    const searchQuery = "category 1";
    history.replaceState(
      history.state,
      null,
      `${window.location.pathname}?query=${searchQuery}`,
    );

    render(
      <BrowserRouter>
        <ProductList
          products={mockProducts}
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
