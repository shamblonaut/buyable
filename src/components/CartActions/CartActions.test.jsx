import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartActions from "./CartActions";
import { CartContext } from "@/contexts";

const mockCart = { 7: 13 };
const mockProduct = { id: 7 };

const mockSetCart = vi.fn();

describe("CartActions component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when cart is empty", () => {
    const { container } = render(
      <CartContext.Provider value={{ cart: {}, setCart: mockSetCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it("renders correctly when cart is not empty", () => {
    const { container } = render(
      <CartContext.Provider value={{ cart: mockCart, setCart: mockSetCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it("shows add to cart button when cart is empty", () => {
    render(
      <CartContext.Provider value={{ cart: {}, setCart: mockSetCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    expect(
      within(screen.getByRole("button", { name: "Add to cart" })).getByText(
        "add to cart",
        { exact: false },
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Remove from cart" }),
    ).not.toBeInTheDocument();
  });

  it("shows remove from cart button and quantity selector when cart is not empty", () => {
    render(
      <CartContext.Provider value={{ cart: mockCart, setCart: mockSetCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: "Remove from cart" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add to cart" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Edit cart quantity" }),
    ).toBeInTheDocument();
  });

  it("shows no. of items of current product in quantity selector", () => {
    render(
      <CartContext.Provider value={{ cart: mockCart, setCart: mockSetCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    expect(
      within(
        screen.getByRole("region", { name: "Edit cart quantity" }),
      ).getByRole("textbox"),
    ).toHaveValue(mockCart[mockProduct.id].toString());
  });

  it("adds an item to the cart when add to cart is clicked", async () => {
    const user = userEvent.setup();

    let cart = {};
    let setCart = vi.spyOn(
      {
        setCart: (newCart) => {
          if (typeof newCart === "function") {
            cart = newCart(cart);
          } else {
            cart = newCart;
          }
        },
      },
      "setCart",
    );

    const { rerender } = render(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({ 7: 1 });

    rerender(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    expect(
      within(
        screen.getByRole("region", { name: "Edit cart quantity" }),
      ).getByRole("textbox"),
    ).toHaveValue("1");
  });

  it("removes item from the cart when remove from cart is clicked", async () => {
    const user = userEvent.setup();

    let cart = { ...mockCart };
    let setCart = vi.spyOn(
      {
        setCart: (newCart) => {
          if (typeof newCart === "function") {
            cart = newCart(cart);
          } else {
            cart = newCart;
          }
        },
      },
      "setCart",
    );

    const { rerender } = render(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    await user.click(screen.getByRole("button", { name: "Remove from cart" }));

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({});

    rerender(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });

  it("removes item from the cart when remove from cart is clicked", async () => {
    const user = userEvent.setup();

    let cart = { ...mockCart };
    let setCart = vi.spyOn(
      {
        setCart: (newCart) => {
          if (typeof newCart === "function") {
            cart = newCart(cart);
          } else {
            cart = newCart;
          }
        },
      },
      "setCart",
    );

    const { rerender } = render(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    await user.click(screen.getByRole("button", { name: "Remove from cart" }));

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({});

    rerender(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });

  it("decrements items from the cart", async () => {
    const user = userEvent.setup();

    let cart = { 7: 2 };
    let setCart = vi.spyOn(
      {
        setCart: (newCart) => {
          if (typeof newCart === "function") {
            cart = newCart(cart);
          } else {
            cart = newCart;
          }
        },
      },
      "setCart",
    );

    render(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Decrement cart quantity" }),
    );

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({ 7: 1 });
  });

  it("removes items from cart when decremented to 0", async () => {
    const user = userEvent.setup();

    let cart = { 7: 1 };
    let setCart = vi.spyOn(
      {
        setCart: (newCart) => {
          if (typeof newCart === "function") {
            cart = newCart(cart);
          } else {
            cart = newCart;
          }
        },
      },
      "setCart",
    );

    render(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Decrement cart quantity" }),
    );

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({});
  });

  it("increments items on the cart", async () => {
    const user = userEvent.setup();

    let cart = { 7: 2 };
    let setCart = vi.spyOn(
      {
        setCart: (newCart) => {
          if (typeof newCart === "function") {
            cart = newCart(cart);
          } else {
            cart = newCart;
          }
        },
      },
      "setCart",
    );

    render(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Increment cart quantity" }),
    );

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({ 7: 3 });
  });

  it("changes items count on the cart with custom input", async () => {
    const user = userEvent.setup();

    let cart = { ...mockCart };
    let setCart = vi.spyOn(
      {
        setCart: (newCart) => {
          if (typeof newCart === "function") {
            cart = newCart(cart);
          } else {
            cart = newCart;
          }
        },
      },
      "setCart",
    );

    render(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    await user.clear(
      screen.getByRole("textbox", { name: "Enter custom cart quantity" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "Enter custom cart quantity" }),
      "256",
    );

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({ 7: 256 });
  });

  it("removes item from cart when custom input is 0", async () => {
    const user = userEvent.setup();

    let cart = { ...mockCart };
    let setCart = vi.spyOn(
      {
        setCart: (newCart) => {
          if (typeof newCart === "function") {
            cart = newCart(cart);
          } else {
            cart = newCart;
          }
        },
      },
      "setCart",
    );

    render(
      <CartContext.Provider value={{ cart, setCart }}>
        <CartActions product={mockProduct} />
      </CartContext.Provider>,
    );

    await user.clear(
      screen.getByRole("textbox", { name: "Enter custom cart quantity" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "Enter custom cart quantity" }),
      "0",
    );

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({});
  });
});
