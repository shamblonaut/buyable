import { Link } from "react-router-dom";
import styled from "styled-components";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";

const Bar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2px solid black;
  background-color: white;

  & .lucide {
    color: black;
  }
`;

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
