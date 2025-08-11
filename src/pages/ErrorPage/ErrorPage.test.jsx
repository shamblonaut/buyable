import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router";

import ErrorPage from "./ErrorPage";

const mockError = {
  status: 404,
  statusText: "Not Found",
  data: "No route matches URL",
};

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: () => mockError,
  };
});

describe("Error Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("displays all error information", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(mockError.status, { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockError.statusText, { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockError.data, { exact: false }),
    ).toBeInTheDocument();
  });

  it("links to the home page", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
