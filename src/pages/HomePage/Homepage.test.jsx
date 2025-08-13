import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppPosition } from "@/utils/constants";

import { mockProductList } from "@tests/data";
import OutletWrapper from "@tests/components/OutletWrapper";

import HomePage from "./HomePage";

const mockOutletContext = {
  productsData: {
    data: mockProductList,
    error: null,
    loading: false,
  },
  appPosition: AppPosition.HOME,
  setAppPosition: vi.spyOn(
    {
      setAppPosition: vi.fn(),
    },
    "setAppPosition",
  ),
};

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <OutletWrapper context={mockOutletContext}>
        <HomePage />
      </OutletWrapper>,
    );

    expect(container).toMatchSnapshot();
  });

  it("sets correct global app position", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <HomePage />
      </OutletWrapper>,
    );

    expect(mockOutletContext.setAppPosition).toHaveBeenLastCalledWith(
      AppPosition.HOME,
    );
  });

  it("links to shop page", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <HomePage />
      </OutletWrapper>,
    );

    expect(
      screen.getByRole("link", { name: "Go to Shop page" }),
    ).toHaveAttribute("href", "/shop");
  });
});
