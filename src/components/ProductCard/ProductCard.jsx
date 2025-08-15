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

const ProductCard = ({ product }) => {
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
      <CartActions product={product} />
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
};

export default ProductCard;
