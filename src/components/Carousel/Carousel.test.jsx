import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";

import Carousel from "./Carousel";

const mockProductList = [
  { id: 1, title: "Product 1", image: "http://example.com/image-1.jpg" },
  { id: 2, title: "Product 2", image: "http://example.com/image-2.jpg" },
  { id: 3, title: "Product 3", image: "http://example.com/image-3.jpg" },
  { id: 4, title: "Product 4", image: "http://example.com/image-4.jpg" },
  { id: 5, title: "Product 5", image: "http://example.com/image-5.jpg" },
  { id: 6, title: "Product 6", image: "http://example.com/image-6.jpg" },
  { id: 7, title: "Product 7", image: "http://example.com/image-7.jpg" },
  { id: 8, title: "Product 8", image: "http://example.com/image-8.jpg" },
  { id: 9, title: "Product 9", image: "http://example.com/image-9.jpg" },
  { id: 10, title: "Product 10", image: "http://example.com/image-10.jpg" },
];

describe("Carousel component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders correctly when products data is available", () => {
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };

    const { container } = render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it("shows loading status", () => {
    const mockData = {
      data: null,
      error: null,
      loading: true,
    };

    const { container } = render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(
      screen.getByText("loading products", { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows error status when products data is not available", () => {
    const mockData = {
      data: null,
      error: new Error("Could not fetch products"),
      loading: false,
    };

    const { container } = render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(
      screen.getByText("Could not load carousel", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText("error", { exact: false })).toBeInTheDocument();
  });

  it("displays a list of products", () => {
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(screen.getAllByRole("listitem").length).toBe(mockData.data.length);
  });

  it("displays only given no. of items if mentioned", () => {
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };
    const itemCount = 4;

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} itemCount={itemCount} />
      </BrowserRouter>,
    );

    expect(screen.getAllByRole("listitem").length).toBe(itemCount);
  });

  it("works when item count is larger than no. of products", () => {
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };
    const itemCount = 16;

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} itemCount={itemCount} />
      </BrowserRouter>,
    );

    expect(screen.getAllByRole("listitem").length).toBe(mockData.data.length);
  });

  it("links each image to its product page", () => {
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(
      within(screen.getAllByRole("listitem")[0]).getByRole("link"),
    ).toHaveAttribute("href", `/product/${mockData.data[0].id}`);
  });

  it("has navigation buttons corresponding to each product", () => {
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(
      screen.getAllByRole("button", { name: "carousel-navigation-button" })
        .length,
    ).toBe(mockData.data.length);
  });

  it("shows corresponding product when navigation button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(0%)`,
    });

    await act(async () => {
      user.click(
        screen.getAllByRole("button", {
          name: "carousel-navigation-button",
        })[3],
      );
    });

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(-300%)`,
    });
  });

  it("automatically scrolls products after a 5s delay", () => {
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(0%)`,
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(-100%)`,
    });

    vi.clearAllTimers();
  });

  it("goes back to first item after the final one", async () => {
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({ transform: `translateX(0%)` });

    for (let i = 1; i < mockProductList.length; i++) {
      act(() => {
        vi.advanceTimersByTime(5000 * i);
      });

      expect(
        screen.getByRole("list", { name: "carousel-image-list" }),
      ).toHaveStyle({
        transform: `translateX(-${100 * i}%)`,
      });
    }

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(0%)`,
    });

    vi.clearAllTimers();
  });

  it("waits another 5s after click navigation before auto-scroll", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const mockData = {
      data: mockProductList,
      error: null,
      loading: false,
    };

    render(
      <BrowserRouter>
        <Carousel productsData={mockData} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(0%)`,
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    await act(async () => {
      user.click(
        screen.getAllByRole("button", {
          name: "carousel-navigation-button",
        })[3],
      );
    });

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(-300%)`,
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(-300%)`,
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(
      screen.getByRole("list", { name: "carousel-image-list" }),
    ).toHaveStyle({
      transform: `translateX(-400%)`,
    });

    vi.clearAllTimers();
  });
});
