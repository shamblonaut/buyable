import { Link } from "react-router-dom";
import styled from "styled-components";
import { Trash2, ShoppingCart } from "lucide-react";

import Quantity from "../components/Quantity";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  border: 2px solid black;
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
  flex: 1;

  & img {
    width: 100%;
    max-width: 160px;
  }
`;

const ProductTitle = styled.p`
  font-weight: 500;

  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  line-height: 1.5em;
  height: 4.5em; /* 3 lines */
`;

const CartActions = styled.div`
  padding-top: 16px;
`;

const CartButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;

  & .lucide {
    width: 20px;
    height: auto;
    margin-right: 8px;
  }
`;

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
        <ProductTitle>{product.title}</ProductTitle>
        <p>${product.price}</p>
      </ProductLink>
      <CartActions>
        {Object.keys(cart).includes(product.id.toString()) ? (
          <>
            <Quantity
              quantity={cart[product.id]}
              increment={incrementCartQuantity}
              decrement={decrementCartQuantity}
            />
            <CartButton onClick={removeFromCart}>
              <Trash2 /> Remove from cart
            </CartButton>
          </>
        ) : (
          <CartButton onClick={addToCart}>
            <ShoppingCart /> Add to cart
          </CartButton>
        )}
      </CartActions>
    </Card>
  );
};

export default ProductCard;
