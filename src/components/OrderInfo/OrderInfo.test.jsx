import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import OrderInfo from "./OrderInfo";

const mockProductList = [
  { id: 1, price: 1023 },
  { id: 2, price: 511 },
  { id: 3, price: 255 },
  { id: 4, price: 127 },
  { id: 5, price: 63.49 },
  { id: 6, price: 31.49 },
  { id: 7, price: 15.49 },
  { id: 8, price: 7.99 },
  { id: 9, price: 3.99 },
  { id: 10, price: 1.99 },
];
const mockCart = {
  1: 1,
  2: 1,
  3: 2,
  4: 3,
  5: 5,
  6: 8,
  7: 13,
  8: 21,
  9: 34,
  10: 55,
};
const mockTaxPercent = 12;

const setCart = vi.fn();

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

    waitFor(() => {
      expect(
        within(screen.getByLabelText("subtotal-field")).queryByText("3608.64", {
          exact: "false",
        }),
      ).toBeInTheDocument();
    });
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

    waitFor(() => {
      expect(
        within(screen.getByLabelText("tax-field")).queryByText("433.04", {
          exact: "false",
        }),
      ).toBeInTheDocument();
    });
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

    waitFor(() => {
      expect(
        within(screen.getByLabelText("total-price-field")).queryByText(
          "4041.68",
          { exact: "false" },
        ),
      ).toBeInTheDocument();
    });
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
