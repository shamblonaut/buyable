import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AppPosition } from "@/utils/constants";
import { useFetch, useLocalStorage } from "@/hooks";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet-page">Mocked Page</div>,
  };
});

vi.mock("@/hooks", () => ({
  useFetch: vi.fn(),
  useLocalStorage: vi.fn(),
}));

vi.mock("@/components", () => ({
  Header: () => <header data-testid="header">BUYABLE</header>,
  Navigator: ({ appPosition, cartCount }) => (
    <nav data-testid="navigator">
      <a>Home{appPosition === AppPosition.HOME && <> [active]</>}</a>
      <a>Shop{appPosition === AppPosition.SHOP && <> [active]</>}</a>
      <a>
        Cart: {cartCount} items
        {appPosition === AppPosition.CART && <> [active]</>}
      </a>
    </nav>
  ),
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useFetch.mockReturnValue({
      data: null,
      error: null,
      loading: true,
    });
    useLocalStorage.mockReturnValue([{ 1: 6, 2: 4 }, vi.fn()]);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("banner")).toBeInTheDocument(); // header
    expect(screen.getByRole("navigation")).toBeInTheDocument(); // nav
  });

  it("activates home tab by default", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText("Home [active]")).toBeInTheDocument();
  });

  it("passes correct amount for number of items in cart", () => {
    useLocalStorage.mockReturnValue([{ 1: 8, 2: 3, 3: 9 }, vi.fn()]);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText("Cart: 20 items")).toBeInTheDocument();
  });
});
