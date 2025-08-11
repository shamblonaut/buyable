import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppPosition } from "@/utils/constants";

import OutletWrapper from "@tests/components/OutletWrapper";

import DisclaimerPage from "./DisclaimerPage";

const mockOutletContext = {
  appPosition: AppPosition.CART,
};

describe("Disclaimer Page", () => {
  it("renders correctly", () => {
    const { container } = render(
      <OutletWrapper context={mockOutletContext}>
        <DisclaimerPage />
      </OutletWrapper>,
    );

    expect(container).toMatchSnapshot();
  });

  it("links to correct back page", () => {
    render(
      <OutletWrapper context={mockOutletContext}>
        <DisclaimerPage />
      </OutletWrapper>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/cart");
  });
});
