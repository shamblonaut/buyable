import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { mockProductList, mockCart } from "@tests/data";

import OrderInfo from "./OrderInfo";

const mockTaxPercent = 12;

const setCart = vi.fn();

vi.mock("./OrderInfo.styles", async (importOriginal) => {
  const actual = await importOriginal();

  const { SubtotalField, TaxField, TotalPriceField } = actual;
  return {
    ...actual,
    SubtotalField: ({ children, ...props }) => (
      <SubtotalField data-testid="subtotal-field" {...props}>
        {children}
      </SubtotalField>
    ),
    TaxField: ({ children, ...props }) => (
      <TaxField data-testid="tax-field" {...props}>
        {children}
      </TaxField>
    ),
    TotalPriceField: ({ children, ...props }) => (
      <TotalPriceField data-testid="total-price-field" {...props}>
        {children}
      </TotalPriceField>
    ),
  };
});

describe("OrderInfo component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <OrderInfo
          products={mockProductList}
          cart={mockCart}
          setCart={setCart}
          taxPercent={mockTaxPercent}
        />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("calculates subtotal properly", () => {
    render(
      <BrowserRouter>
        <OrderInfo
          products={mockProductList}
          cart={mockCart}
          setCart={setCart}
          taxPercent={mockTaxPercent}
        />
      </BrowserRouter>,
    );

    expect(
      within(screen.getByTestId("subtotal-field")).getByText("$3743.03"),
    ).toBeInTheDocument();
  });

  it("calculates tax properly", () => {
    render(
      <BrowserRouter>
        <OrderInfo
          products={mockProductList}
          cart={mockCart}
          setCart={setCart}
          taxPercent={mockTaxPercent}
        />
      </BrowserRouter>,
    );

    expect(
      within(screen.getByTestId("tax-field")).getByText("$449.16"),
    ).toBeInTheDocument();
  });

  it("calculates total price properly", () => {
    render(
      <BrowserRouter>
        <OrderInfo
          products={mockProductList}
          cart={mockCart}
          setCart={setCart}
          taxPercent={mockTaxPercent}
        />
      </BrowserRouter>,
    );

    expect(
      within(screen.getByTestId("total-price-field")).getByText("$4192.19"),
    ).toBeInTheDocument();
  });

  it("has a link to disclaimer page", () => {
    render(
      <BrowserRouter>
        <OrderInfo
          products={mockProductList}
          cart={mockCart}
          setCart={setCart}
          taxPercent={mockTaxPercent}
        />
      </BrowserRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/disclaimer");
  });
});
