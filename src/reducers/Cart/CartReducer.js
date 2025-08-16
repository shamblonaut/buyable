import { CartAction } from "@/utils/constants";

const cartReducer = (cart, action) => {
  switch (action.type) {
    case CartAction.ADDED: {
      const { productId } = action.payload;

      return {
        ...cart,
        [productId]: 1,
      };
    }

    case CartAction.REMOVED: {
      const { productId } = action.payload;

      const { [productId]: _, ...newCart } = cart;
      return newCart;
    }

    case CartAction.INCREMENTED: {
      const { productId } = action.payload;

      return {
        ...cart,
        [productId]: cart[productId] + 1,
      };
    }

    case CartAction.DECREMENTED: {
      const { productId } = action.payload;

      return {
        ...cart,
        [productId]: cart[productId] - 1,
      };
    }

    case CartAction.EDITED: {
      const { productId, newQuantity } = action.payload;

      return {
        ...cart,
        [productId]: newQuantity,
      };
    }

    case CartAction.CLEARED: {
      return {};
    }

    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
};

export default cartReducer;
