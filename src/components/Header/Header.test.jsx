import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Header from "./Header";

describe("Header component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
