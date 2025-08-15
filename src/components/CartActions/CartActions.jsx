import { useContext } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";

import { CartContext } from "@/contexts";

import { QuantitySelector } from "@/components";
import { Container, AddButton, RemoveButton } from "./CartActions.styles";

const CartActions = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = () => {
    setCart((cart) => {
      const newCart = { ...cart };
      newCart[product.id] = 1;
      return newCart;
    });
  };

  const removeFromCart = () => {
    setCart((cart) => {
      const newCart = { ...cart };
      delete newCart[product.id];
      return newCart;
    });
  };

  const incrementCartQuantity = () => {
    setCart((cart) => {
      const newCart = { ...cart };
      newCart[product.id] += 1;
      return newCart;
    });
  };

  const decrementCartQuantity = () => {
    setCart((cart) => {
      const newCart = { ...cart };
      newCart[product.id] -= 1;

      if (newCart[product.id] === 0) {
        delete newCart[product.id];
      }

      return newCart;
    });
  };

  const setQuantity = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart();
      return;
    }

    setCart((cart) => {
      const newCart = { ...cart };
      newCart[product.id] = newQuantity;
      return newCart;
    });
  };

  return (
    <Container>
      {Object.keys(cart).includes(product.id.toString()) ? (
        <>
          <QuantitySelector
            quantity={cart[product.id]}
            setQuantity={setQuantity}
            increment={incrementCartQuantity}
            decrement={decrementCartQuantity}
          />
          <RemoveButton onClick={removeFromCart} aria-label="Remove from cart">
            <Trash2 />
          </RemoveButton>
        </>
      ) : (
        <AddButton onClick={addToCart} aria-label="Add to cart">
          <ShoppingCart /> Add to cart
        </AddButton>
      )}
    </Container>
  );
};

CartActions.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartActions;
