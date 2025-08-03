import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import ProductCard from "./ProductCard";

const mockProduct = {
  id: 1,
  title: "Mock Product",
  price: 15.99,
  image: "http://example.com/mock-image.jpg",
};
const mockCart = { 1: 16 };
const mockSetCart = vi.fn();

describe("ProductCard component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <ProductCard
          product={mockProduct}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("links to product page of given product", () => {
    render(
      <BrowserRouter>
        <ProductCard
          product={mockProduct}
          cart={mockCart}
          setCart={mockSetCart}
        />
      </BrowserRouter>,
    );

    expect(screen.getByRole("link", { name: "product-link" })).toHaveAttribute(
      "href",
      `/product/${mockProduct.id}`,
    );
  });
});
