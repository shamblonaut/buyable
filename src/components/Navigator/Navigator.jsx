import { Link } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";

import { AppPosition } from "@/utils/constants";

import { Bar, Tabs, Icon } from "./Navigator.styles";

const Navigator = ({ appPosition }) => (
  <Bar>
    <Tabs>
      <Link to="/">
        <Icon $active={appPosition === AppPosition.HOME}>
          <Home />
        </Icon>
      </Link>
      <Link to="/shop">
        <Icon $active={appPosition === AppPosition.SHOP}>
          <ShoppingBag />
        </Icon>
      </Link>
      <Link to="/cart">
        <Icon $active={appPosition === AppPosition.CART}>
          <ShoppingCart />
        </Icon>
      </Link>
    </Tabs>
  </Bar>
);

export default Navigator;
