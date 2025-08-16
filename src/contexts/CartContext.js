import { createContext } from "react";

const CartContext = createContext({
  cart: {},
  dispatchCartAction: () => {},
});

export default CartContext;
