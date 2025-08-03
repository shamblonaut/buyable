import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { AppPosition } from "@/utils/constants";
import Navigator from "./Navigator";

const mockCartCount = 16;

describe("Navigator component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <Navigator appPosition={AppPosition.HOME} cartCount={mockCartCount} />,
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("highlights currently active page", () => {
    render(
      <BrowserRouter>
        <Navigator appPosition={AppPosition.SHOP} cartCount={mockCartCount} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("link", { name: "home-page-link" }).firstChild,
    ).not.toHaveStyle({
      color: "var(--color-light)",
    });
    expect(
      screen.getByRole("link", { name: "shop-page-link" }).firstChild,
    ).toHaveStyle({
      color: "var(--color-light)",
    });
    expect(
      screen.getByRole("link", { name: "cart-page-link" }).firstChild,
    ).not.toHaveStyle({
      color: "var(--color-light)",
    });
  });

  it("shows current no. of items in cart within cart page link", () => {
    render(
      <BrowserRouter>
        <Navigator appPosition={AppPosition.SHOP} cartCount={mockCartCount} />
      </BrowserRouter>,
    );

    expect(
      within(screen.getByRole("link", { name: "cart-page-link" })).queryByText(
        mockCartCount.toString(),
      ),
    ).toBeInTheDocument();
  });

  it("links to respective pages correctly", () => {
    render(
      <BrowserRouter>
        <Navigator appPosition={AppPosition.HOME} cartCount={mockCartCount} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("link", { name: "home-page-link" }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: "shop-page-link" }),
    ).toHaveAttribute("href", "/shop");
    expect(
      screen.getByRole("link", { name: "cart-page-link" }),
    ).toHaveAttribute("href", "/cart");
  });
});
