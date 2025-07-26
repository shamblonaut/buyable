import { Link } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";

import { Bar } from "./Navigator.styles";

const Navigator = () => (
  <Bar>
    <Link to="/">
      <Home />
    </Link>
    <Link to="/shop">
      <ShoppingBag />
    </Link>
    <Link to="/cart">
      <ShoppingCart />
    </Link>
  </Bar>
);

export default Navigator;
