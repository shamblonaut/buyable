import { useContext } from "react";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";

import { CartContext } from "@/contexts";
import { AppPosition } from "@/utils/constants";

import { Bar, Tabs, PageLink, CartIndicator } from "./Navigator.styles";

const Navigator = ({ appPosition }) => {
  const { cart } = useContext(CartContext);

  const cartCount = Object.values(cart).reduce(
    (sum, current) => sum + current,
    0,
  );

  return (
    <Bar>
      <Tabs>
        <PageLink
          to="/"
          aria-label="Go to Home page"
          $active={appPosition === AppPosition.HOME}
        >
          <Home />
        </PageLink>
        <PageLink
          to="/shop"
          aria-label="Go to Shop page"
          $active={appPosition === AppPosition.SHOP}
        >
          <ShoppingBag />
        </PageLink>
        <PageLink
          to="/cart"
          aria-label="Go to Cart page"
          $active={appPosition === AppPosition.CART}
        >
          <ShoppingCart />
          {cartCount > 0 && (
            <CartIndicator>{cartCount < 100 ? cartCount : "99+"}</CartIndicator>
          )}
        </PageLink>
      </Tabs>
    </Bar>
  );
};

Navigator.propTypes = {
  appPosition: PropTypes.oneOf(Object.values(AppPosition)),
};

export default Navigator;
