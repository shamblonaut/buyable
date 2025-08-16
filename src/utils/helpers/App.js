import { AppPosition } from "@/utils/constants";

export const getPositionRoute = (appPosition) => {
  switch (appPosition) {
    case AppPosition.HOME:
      return "/";
    case AppPosition.SHOP:
      return "/shop";
    case AppPosition.CART:
      return "/cart";
  }
};
