import { Trash2, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";

import { ProductType } from "@/utils/types";

import { QuantitySelector } from "@/components";
import { Container, AddButton, RemoveButton } from "./CartActions.styles";

const CartActions = ({ product, cart, setCart }) => {
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
          <RemoveButton onClick={removeFromCart}>
            <Trash2 />
          </RemoveButton>
        </>
      ) : (
        <AddButton onClick={addToCart}>
          <ShoppingCart /> Add to cart
        </AddButton>
      )}
    </Container>
  );
};

CartActions.propTypes = {
  product: ProductType.isRequired,
  cart: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default CartActions;
