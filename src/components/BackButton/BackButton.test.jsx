import { describe, it, expect } from "vitest";
import { cleanup, render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { AppPosition } from "@/utils/constants";
import BackButton from "./BackButton";

describe("BackButton component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <BackButton appPosition={AppPosition.HOME} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("links to respective pages correctly", () => {
    const homeBackButton = render(
      <BrowserRouter>
        <BackButton appPosition={AppPosition.HOME} />
      </BrowserRouter>,
    );
    expect(homeBackButton.getByRole("link")).toHaveAttribute("href", "/");

    cleanup();

    const shopBackButton = render(
      <BrowserRouter>
        <BackButton appPosition={AppPosition.SHOP} />
      </BrowserRouter>,
    );
    expect(shopBackButton.getByRole("link")).toHaveAttribute("href", "/shop");

    cleanup();

    const cartBackButton = render(
      <BrowserRouter>
        <BackButton appPosition={AppPosition.CART} />
      </BrowserRouter>,
    );
    expect(cartBackButton.getByRole("link")).toHaveAttribute("href", "/cart");
  });
});
