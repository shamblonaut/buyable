import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartActions from "./CartActions";

const mockCart = { 7: 13 };
const mockProduct = { id: 7 };

const mockSetCart = vi.fn();

describe("CartActions component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when cart is empty", () => {
    const { container } = render(
      <CartActions product={mockProduct} cart={{}} setCart={mockSetCart} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("renders correctly when cart is not empty", () => {
    const { container } = render(
      <CartActions
        product={mockProduct}
        cart={mockCart}
        setCart={mockSetCart}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("shows add to cart button when cart is empty", () => {
    render(
      <CartActions product={mockProduct} cart={{}} setCart={mockSetCart} />,
    );

    expect(
      within(screen.getByRole("button", { name: "cart-add-button" })).getByText(
        "add to cart",
        { exact: false },
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "cart-remove-button" }),
    ).not.toBeInTheDocument();
  });

  it("shows remove from cart button and quantity selector when cart is not empty", () => {
    render(
      <CartActions
        product={mockProduct}
        cart={mockCart}
        setCart={mockSetCart}
      />,
    );

    expect(
      screen.getByRole("button", { name: "cart-remove-button" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "cart-add-button" }),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText("cart-quantity-selector")).toBeInTheDocument();
  });

  it("shows no. of items of current product in quantity selector", () => {
    render(
      <CartActions
        product={mockProduct}
        cart={mockCart}
        setCart={mockSetCart}
      />,
    );

    expect(
      within(screen.getByLabelText("cart-quantity-selector")).getByRole(
        "textbox",
      ),
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
      <CartActions product={mockProduct} cart={cart} setCart={setCart} />,
    );

    await user.click(screen.getByRole("button", { name: "cart-add-button" }));

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({ 7: 1 });

    rerender(
      <CartActions product={mockProduct} cart={cart} setCart={setCart} />,
    );

    expect(
      within(screen.getByLabelText("cart-quantity-selector")).getByRole(
        "textbox",
      ),
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
      <CartActions product={mockProduct} cart={cart} setCart={setCart} />,
    );

    await user.click(
      screen.getByRole("button", { name: "cart-remove-button" }),
    );

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({});

    rerender(
      <CartActions product={mockProduct} cart={cart} setCart={setCart} />,
    );

    expect(
      screen.getByRole("button", { name: "cart-add-button" }),
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
      <CartActions product={mockProduct} cart={cart} setCart={setCart} />,
    );

    await user.click(
      screen.getByRole("button", { name: "cart-remove-button" }),
    );

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({});

    rerender(
      <CartActions product={mockProduct} cart={cart} setCart={setCart} />,
    );

    expect(
      screen.getByRole("button", { name: "cart-add-button" }),
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

    render(<CartActions product={mockProduct} cart={cart} setCart={setCart} />);

    await user.click(
      screen.getByRole("button", { name: "quantity-decrement-button" }),
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

    render(<CartActions product={mockProduct} cart={cart} setCart={setCart} />);

    await user.click(
      screen.getByRole("button", { name: "quantity-decrement-button" }),
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

    render(<CartActions product={mockProduct} cart={cart} setCart={setCart} />);

    await user.click(
      screen.getByRole("button", { name: "quantity-increment-button" }),
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

    render(<CartActions product={mockProduct} cart={cart} setCart={setCart} />);

    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
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

    render(<CartActions product={mockProduct} cart={cart} setCart={setCart} />);

    await user.clear(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "custom-quantity-input" }),
      "0",
    );

    expect(setCart).toHaveBeenCalled();
    expect(cart).toMatchObject({});
  });
});
