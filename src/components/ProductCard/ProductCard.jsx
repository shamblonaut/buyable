import PropTypes from "prop-types";

import { CartActions } from "@/components";
import {
  Card,
  ProductLink,
  ImageContainer,
  ProductDetails,
  ProductTitle,
  ProductPrice,
} from "./ProductCard.styles";

const ProductCard = ({ product, cart, setCart }) => {
  return (
    <Card>
      <ProductLink
        to={`/product/${product.id}`}
        aria-label="product-link"
        title={product.title}
      >
        <ImageContainer>
          <img src={product.image} alt={product.title} />
        </ImageContainer>
        <ProductDetails>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>${product.price}</ProductPrice>
        </ProductDetails>
      </ProductLink>
      <CartActions product={product} cart={cart} setCart={setCart} />
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  cart: PropTypes.objectOf(PropTypes.number).isRequired,
  setCart: PropTypes.func.isRequired,
};

export default ProductCard;
