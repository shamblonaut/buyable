import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppPosition } from "@/utils/constants";

import { mockProductList, mockCart } from "@tests/data";
import OutletWrapper from "@tests/components/OutletWrapper";

import ShopPage from "./ShopPage";

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

describe("Shop Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <OutletWrapper context={mockOutletContext}>
        <ShopPage />
      </OutletWrapper>,
    );

    expect(container).toMatchSnapshot();
  });

  it("sets the app position correctly on load", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <ShopPage />
      </OutletWrapper>,
    );

    expect(mockOutletContext.setAppPosition).toHaveBeenCalledWith(
      AppPosition.SHOP,
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
        <ShopPage />
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
        <ShopPage />
      </OutletWrapper>,
    );

    expect(
      screen.getByText("could not load products", { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("mock error", { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows the correct products in product list", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <ShopPage />
      </OutletWrapper>,
    );

    screen.getAllByTestId("product").forEach((productItem, index) => {
      expect(productItem.textContent).toBe(
        mockProductList[index].id.toString(),
      );
    });
  });
});
