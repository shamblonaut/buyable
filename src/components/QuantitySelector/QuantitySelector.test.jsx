import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import QuantitySelector from "./QuantitySelector";

const mockQuantity = 4;
const mockSetQuantity = vi.fn();
const mockDecrement = vi.fn();
const mockIncrement = vi.fn();

describe("QuantitySelector component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when cart is empty", () => {
    const { container } = render(
      <QuantitySelector
        quantity={mockQuantity}
        setQuantity={mockSetQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("calls allocated decrement function", async () => {
    const user = userEvent.setup();

    let decrement = vi.spyOn(
      {
        decrement: vi.fn(),
      },
      "decrement",
    );
    let increment = vi.spyOn(
      {
        increment: vi.fn(),
      },
      "increment",
    );

    render(
      <QuantitySelector
        quantity={mockQuantity}
        setQuantity={mockSetQuantity}
        decrement={decrement}
        increment={increment}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "quantity-decrement-button" }),
    );

    expect(decrement).toHaveBeenCalled();
    expect(increment).not.toHaveBeenCalled();
  });

  it("calls allocated increment function", async () => {
    const user = userEvent.setup();

    let decrement = vi.spyOn(
      {
        decrement: vi.fn(),
      },
      "decrement",
    );
    let increment = vi.spyOn(
      {
        increment: vi.fn(),
      },
      "increment",
    );

    render(
      <QuantitySelector
        quantity={mockQuantity}
        setQuantity={mockSetQuantity}
        decrement={decrement}
        increment={increment}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "quantity-increment-button" }),
    );

    expect(increment).toHaveBeenCalled();
    expect(decrement).not.toHaveBeenCalled();
  });

  it("passes (only) custom number quantity input to setQuantity", async () => {
    const user = userEvent.setup();

    let setQuantity = vi.spyOn(
      {
        setQuantity: vi.fn(),
      },
      "setQuantity",
    );

    render(
      <QuantitySelector
        quantity={mockQuantity}
        setQuantity={setQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );

    expect(setQuantity).not.toHaveBeenCalled();

    await user.type(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
      "16",
    );

    expect(setQuantity).toHaveBeenCalledWith(16);
    vi.clearAllMocks();

    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
      "asdf",
    );

    expect(setQuantity).not.toHaveBeenCalled();
  });

  it("resets the custom input value when a new quantity value is passed", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <QuantitySelector
        quantity={mockQuantity}
        setQuantity={mockSetQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
      "16",
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue("16");

    rerender(
      <QuantitySelector
        quantity={7}
        setQuantity={mockSetQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue("7");
  });

  it("resets the custom input value when focus is lost on an invalid input", async () => {
    const user = userEvent.setup();

    let quantity = mockQuantity;
    let setQuantity = vi.spyOn(
      {
        setQuantity: (newQuantity) => {
          quantity = newQuantity;
        },
      },
      "setQuantity",
    );

    const { rerender } = render(
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    // Empty value
    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue("");

    await user.tab();
    rerender(
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue(mockQuantity.toString());

    // Alphabetic characters
    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
      "asdf",
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue("asdf");

    await user.tab();
    rerender(
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue(mockQuantity.toString());

    // Negative number
    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
      "-9",
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue("-9");

    await user.tab();
    rerender(
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue(mockQuantity.toString());

    // Valid number
    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
      "7",
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue("7");

    await user.tab();
    rerender(
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        decrement={mockDecrement}
        increment={mockIncrement}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    ).toHaveValue("7");
    expect(setQuantity).toHaveBeenCalledWith(7);
  });
});
