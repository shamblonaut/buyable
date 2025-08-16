import { useContext } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";

import { CartAction } from "@/utils/constants/Cart";

import { CartContext } from "@/contexts";

import { QuantitySelector } from "@/components";
import { Container, AddButton, RemoveButton } from "./CartActions.styles";

const CartActions = ({ product }) => {
  const { cart, dispatchCartAction } = useContext(CartContext);

  const handleAdd = () => {
    dispatchCartAction({
      type: CartAction.ADDED,
      payload: { productId: product.id },
    });
  };
  const handleRemove = () => {
    dispatchCartAction({
      type: CartAction.REMOVED,
      payload: { productId: product.id },
    });
  };
  const handleIncrement = () => {
    dispatchCartAction({
      type: CartAction.INCREMENTED,
      payload: { productId: product.id },
    });
  };
  const handleDecrement = () => {
    if (cart[product.id] === 1) {
      handleRemove();
      return;
    }

    dispatchCartAction({
      type: CartAction.DECREMENTED,
      payload: { productId: product.id },
    });
  };
  const handleSetQuantity = (newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove();
      return;
    }

    dispatchCartAction({
      type: CartAction.EDITED,
      payload: { productId: product.id, newQuantity },
    });
  };

  return (
    <Container>
      {Object.keys(cart).includes(product.id.toString()) ? (
        <>
          <QuantitySelector
            quantity={cart[product.id]}
            setQuantity={handleSetQuantity}
            increment={handleIncrement}
            decrement={handleDecrement}
          />
          <RemoveButton onClick={handleRemove} aria-label="Remove from cart">
            <Trash2 />
          </RemoveButton>
        </>
      ) : (
        <AddButton onClick={handleAdd} aria-label="Add to cart">
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
