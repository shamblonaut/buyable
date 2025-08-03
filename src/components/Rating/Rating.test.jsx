import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import Rating from "./Rating";

const mockRating = 3.2;
const mockCount = 256;

vi.mock("./Rating.styles", async (importOriginal) => {
  const actual = await importOriginal();

  const FillMask = actual.FillMask;
  return {
    ...actual,
    StarShell: () => <div data-testid="star-shell"></div>,
    FillMask: ({ children, ...props }) => (
      <FillMask data-testid="fill-mask" {...props}>
        {children}
      </FillMask>
    ),
  };
});

describe("Rating component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Rating rating={mockRating} count={mockCount} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("has exactly 5 shells", () => {
    render(<Rating rating={mockRating} count={mockCount} />);

    expect(screen.getAllByTestId("star-shell").length).toBe(5);
  });

  it("sets the correct width for each star", () => {
    render(<Rating rating={mockRating} count={mockCount} />);

    const fillMaskList = screen.getAllByTestId("fill-mask");

    expect(fillMaskList.length).toBe(5);
    expect(fillMaskList[0]).toHaveStyle({ width: "100%" });
    expect(fillMaskList[1]).toHaveStyle({ width: "100%" });
    expect(fillMaskList[2]).toHaveStyle({ width: "100%" });
    expect(fillMaskList[3]).toHaveStyle({ width: "20%" });
    expect(fillMaskList[4]).toHaveStyle({ width: "0%" });
  });
});
