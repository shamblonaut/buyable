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

    expect(
      screen.getByRole("link", { name: "Go to Home page" }).firstChild,
    ).toHaveStyle({
      color: "var(--color-light)",
    });
  });

  it("passes correct amount for number of items in cart", () => {
    useLocalStorage.mockReturnValue([{ 1: 8, 2: 3, 3: 9 }, vi.fn()]);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
