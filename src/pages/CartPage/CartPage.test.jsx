import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppPosition } from "@/utils/constants";

import { mockProductList, mockCart } from "@tests/data";
import OutletWrapper from "@tests/components/OutletWrapper";

import CartPage from "./CartPage";

const mockOutletContext = {
  productsData: {
    data: mockProductList,
    error: null,
    loading: false,
  },
  cart: mockCart,
  setCart: vi.spyOn(
    {
      setCart: vi.fn(),
    },
    "setCart",
  ),
  setAppPosition: vi.spyOn(
    {
      setAppPosition: vi.fn(),
    },
    "setAppPosition",
  ),
};

vi.mock("@/components", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    ProductList: ({ products }) => (
      <ul>
        {products.map((product) => (
          <li data-testid="product" key={product.id}>
            {product.id}
          </li>
        ))}
      </ul>
    ),
  };
});

describe("Cart Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <OutletWrapper context={mockOutletContext}>
        <CartPage />
      </OutletWrapper>,
    );

    expect(container).toMatchSnapshot();
  });

  it("sets the app position correctly on load", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <CartPage />
      </OutletWrapper>,
    );

    expect(mockOutletContext.setAppPosition).toHaveBeenCalledWith(
      AppPosition.CART,
    );
  });

  it("shows loading text when data is loading", () => {
    render(
      <OutletWrapper
        context={{
          ...mockOutletContext,
          productsData: {
            data: null,
            error: null,
            loading: true,
          },
        }}
      >
        <CartPage />
      </OutletWrapper>,
    );

    expect(
      screen.getByText("loading products", { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows error text when there is an error in loading the data", () => {
    render(
      <OutletWrapper
        context={{
          ...mockOutletContext,
          productsData: {
            data: null,
            error: new Error("Mock Error"),
            loading: false,
          },
        }}
      >
        <CartPage />
      </OutletWrapper>,
    );

    expect(
      screen.getByText("could not load products", { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("mock error", { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows message when cart is empty", () => {
    render(
      <OutletWrapper
        context={{
          ...mockOutletContext,
          cart: {},
        }}
      >
        <CartPage />
      </OutletWrapper>,
    );

    expect(
      screen.getByText("cart is empty", { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows only the products present in cart in the product list", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <CartPage />
      </OutletWrapper>,
    );

    expect(screen.getAllByTestId("product").length).toBe(
      Object.keys(mockOutletContext.cart).length,
    );
    screen.getAllByTestId("product").forEach((productItem, index) => {
      expect(productItem.textContent).toBe(
        Object.keys(mockOutletContext.cart)[index],
      );
    });
  });
});
