import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";

import ProductFilters from "./ProductFilters";

const mockProducts = [
  {
    id: 1,
    price: 1023,
    title: "Proton Laptop 16GB RAM 512GB SSD",
    image: "http://example.com/image-1.jpg",
    category: "Electronics",
    rating: { rate: 3.5, count: 128 },
  },
  {
    id: 2,
    price: 511,
    title: "Tungstenite Graphics Card 6GB VRAM",
    image: "http://example.com/image-2.jpg",
    category: "Electronics",
    rating: { rate: 4.0, count: 64 },
  },
  {
    id: 3,
    price: 255,
    title: "Element X25 Smartphone",
    image: "http://example.com/image-3.jpg",
    category: "Electronics",
    rating: { rate: 2.3, count: 32 },
  },
  {
    id: 4,
    price: 127,
    title: "Electron Processor 2.4GHz",
    image: "http://example.com/image-4.jpg",
    category: "Electronics",
    rating: { rate: 4.8, count: 256 },
  },
  {
    id: 5,
    price: 63.49,
    title: "Nucleon Motherboard",
    image: "http://example.com/image-5.jpg",
    category: "Electronics",
    rating: { rate: 3.2, count: 16 },
  },
  {
    id: 6,
    price: 31.49,
    title: "Newton Sports Sneakers",
    image: "http://example.com/image-6.jpg",
    category: "Accessories",
    rating: { rate: 3.8, count: 96 },
  },
  {
    id: 7,
    price: 15.49,
    title: "Graviton Travel Bag",
    image: "http://example.com/image-7.jpg",
    category: "Accessories",
    rating: { rate: 2.7, count: 12 },
  },
  {
    id: 8,
    price: 7.99,
    title: "Torqus Chronometer Wristwatch",
    image: "http://example.com/image-8.jpg",
    category: "Accessories",
    rating: { rate: 2.1, count: 18 },
  },
  {
    id: 9,
    price: 3.99,
    title: "Pendulus Necklace",
    image: "http://example.com/image-9.jpg",
    category: "Accessories",
    rating: { rate: 1.8, count: 13 },
  },
  {
    id: 10,
    price: 1.99,
    title: "Centrifume Ring",
    image: "http://example.com/image-10.jpg",
    category: "Accessories",
    rating: { rate: 3.9, count: 84 },
  },
];

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
          products={mockProducts}
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
          products={mockProducts}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    const selectorOptions = within(
      screen.getByRole("combobox", { name: "category-selector" }),
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
          products={mockProducts}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.type(
      screen.getByRole("textbox", { name: "product-search-input" }),
      "product",
    );

    expect(window.location.search).toBe("?query=product");
  });

  it("filters products by matching search query with product titles", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProducts}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.type(
      screen.getByRole("textbox", { name: "product-search-input" }),
      "gb",
    );

    expect(mockSetFilteredProducts).toHaveBeenCalledWith([
      mockProducts[0],
      mockProducts[1],
    ]);
  });

  it("filters products by matching search query with categories", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProducts}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.type(
      screen.getByRole("textbox", { name: "product-search-input" }),
      "electronics",
    );

    expect(mockSetFilteredProducts).toHaveBeenCalledWith(
      mockProducts.slice(0, 5),
    );
  });

  it("filters by selected category", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <ProductFilters
          products={mockProducts}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "category-selector" }),
      "all",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith(mockProducts);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "category-selector" }),
      "Electronics",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith(
      mockProducts.slice(0, 5),
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "category-selector" }),
      "Accessories",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith(
      mockProducts.slice(5, 10),
    );
  });

  it("filters by respective sorting methods", async () => {
    const user = userEvent.setup();

    const products = mockProducts.slice(0, 5);

    render(
      <BrowserRouter>
        <ProductFilters
          products={products}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "sort-selector" }),
      "relevance",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith(products);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "sort-selector" }),
      "cheap",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      products[4],
      products[3],
      products[2],
      products[1],
      products[0],
    ]);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "sort-selector" }),
      "expensive",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      products[0],
      products[1],
      products[2],
      products[3],
      products[4],
    ]);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "sort-selector" }),
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
          products={mockProducts}
          setFilteredProducts={mockSetFilteredProducts}
        />
      </BrowserRouter>,
    );

    // Select electronics category
    await user.selectOptions(
      screen.getByRole("combobox", { name: "category-selector" }),
      "Electronics",
    );

    // Search for titles with "gb"
    await user.type(
      screen.getByRole("textbox", { name: "product-search-input" }),
      "gb",
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "sort-selector" }),
      "cheap",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      mockProducts[1],
      mockProducts[0],
    ]);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "sort-selector" }),
      "expensive",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      mockProducts[0],
      mockProducts[1],
    ]);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "sort-selector" }),
      "best",
    );

    expect(mockSetFilteredProducts).toHaveBeenLastCalledWith([
      mockProducts[1],
      mockProducts[0],
    ]);
  });
});
