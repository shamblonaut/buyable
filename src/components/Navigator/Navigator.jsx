import { Link } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";

import { Bar, Tabs } from "./Navigator.styles";

const Navigator = () => (
  <Bar>
    <Tabs>
      <Link to="/">
        <Home />
      </Link>
      <Link to="/shop">
        <ShoppingBag />
      </Link>
      <Link to="/cart">
        <ShoppingCart />
      </Link>
    </Tabs>
  </Bar>
);

export default Navigator;
