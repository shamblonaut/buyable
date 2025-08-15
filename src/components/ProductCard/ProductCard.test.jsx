import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import ProductCard from "./ProductCard";
import { CartContext } from "@/contexts";

const mockProduct = {
  id: 1,
  title: "Mock Product",
  price: 15.99,
  image: "http://example.com/mock-image.jpg",
};
const mockCart = { 1: 16 };
const mockSetCart = vi.fn();

vi.mock("./ProductCard.styles", async (importOriginal) => {
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
});

describe("ProductCard component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <CartContext.Provider value={{ cart: mockCart, setCart: mockSetCart }}>
          <ProductCard product={mockProduct} />
        </CartContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("links to product page of given product", () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ cart: mockCart, setCart: mockSetCart }}>
          <ProductCard product={mockProduct} />
        </CartContext.Provider>
      </BrowserRouter>,
    );

    expect(screen.getByTestId("product-link")).toHaveAttribute(
      "href",
      `/product/${mockProduct.id}`,
    );
  });
});
