import { Trash2, ShoppingCart } from "lucide-react";

import { Quantity } from "@/components";

import {
  Card,
  ProductLink,
  ImageContainer,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  CartActions,
  CartAddButton,
  CartRemoveButton,
} from "./ProductCard.styles";

const ProductCard = ({ product, cart, setCart }) => {
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

  return (
    <Card>
      <ProductLink to={`/product/${product.id}`} title={product.title}>
        <ImageContainer>
          <img src={product.image} alt={product.title} />
        </ImageContainer>
        <ProductDetails>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>${product.price}</ProductPrice>
        </ProductDetails>
      </ProductLink>
      <CartActions>
        {Object.keys(cart).includes(product.id.toString()) ? (
          <>
            <Quantity
              quantity={cart[product.id]}
              increment={incrementCartQuantity}
              decrement={decrementCartQuantity}
            />
            <CartRemoveButton onClick={removeFromCart}>
              <Trash2 />
            </CartRemoveButton>
          </>
        ) : (
          <CartAddButton onClick={addToCart}>
            <ShoppingCart /> Add to cart
          </CartAddButton>
        )}
      </CartActions>
    </Card>
  );
};

export default ProductCard;
