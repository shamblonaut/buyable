import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";

import { AppPosition } from "@/utils/constants";
import { Bar, Tabs, PageLink, CartIndicator } from "./Navigator.styles";

const Navigator = ({ appPosition, cartCount }) => (
  <Bar>
    <Tabs>
      <PageLink to="/" $active={appPosition === AppPosition.HOME}>
        <Home />
      </PageLink>
      <PageLink to="/shop" $active={appPosition === AppPosition.SHOP}>
        <ShoppingBag />
      </PageLink>
      <PageLink to="/cart" $active={appPosition === AppPosition.CART}>
        <ShoppingCart />
        {cartCount > 0 && (
          <CartIndicator>{cartCount < 100 ? cartCount : "99+"}</CartIndicator>
        )}
      </PageLink>
    </Tabs>
  </Bar>
);

Navigator.propTypes = {
  appPosition: PropTypes.oneOf(Object.values(AppPosition)),
  cartCount: PropTypes.number.isRequired,
};

export default Navigator;
