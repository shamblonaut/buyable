import PropTypes from "prop-types";

import { ProductType } from "@/utils/types";

import {
  Card,
  ProductLink,
  ImageContainer,
  ProductDetails,
  ProductTitle,
  ProductPrice,
} from "./ProductCard.styles";

import { CartActions } from "@/components";

const ProductCard = ({ product, cart, setCart }) => {
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
      <CartActions product={product} cart={cart} setCart={setCart} />
    </Card>
  );
};

ProductCard.propTypes = {
  product: ProductType.isRequired,
  cart: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default ProductCard;
