import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppPosition } from "@/utils/constants";

import { mockProductList, mockCart } from "@tests/data";
import OutletWrapper from "@tests/components/OutletWrapper";

import ProductPage from "./ProductPage";

const mockOutletContext = {
  cart: mockCart,
  setCart: vi.spyOn(
    {
      setCart: vi.fn(),
    },
    "setCart",
  ),
  appPosition: AppPosition.SHOP,
};
const mockProduct = mockProductList[2];

vi.mock("@/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useFetch: vi.spyOn(
      {
        useFetch: vi.fn(() => ({
          data: mockProduct,
          error: null,
          loading: false,
        })),
      },
      "useFetch",
    ),
  };
});

import { useFetch } from "@/hooks";

describe("Product Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <OutletWrapper context={mockOutletContext}>
        <ProductPage />
      </OutletWrapper>,
    );

    expect(container).toMatchSnapshot();
  });

  it("links to correct back page", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <ProductPage />
      </OutletWrapper>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/shop");
  });

  it("shows loading text when data is loading", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      error: null,
      loading: true,
    });

    render(
      <OutletWrapper context={mockOutletContext}>
        <ProductPage />
      </OutletWrapper>,
    );

    expect(
      screen.getByText("loading product", { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows error text when there is an error in loading the data", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      error: new Error("Mock Error"),
      loading: false,
    });

    render(
      <OutletWrapper context={mockOutletContext}>
        <ProductPage />
      </OutletWrapper>,
    );

    expect(
      screen.getByText("product not found", { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("mock error", { exact: false }),
    ).toBeInTheDocument();
  });

  it("uses correct product for cart actions", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <ProductPage />
      </OutletWrapper>,
    );

    expect(screen.getByLabelText("cart-quantity-selector")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }).value,
    ).toBe("2");
  });
});
