import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  height: 100%;
  padding: 16px;
  border: 2px solid black;
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
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

const ProductCard = ({ product }) => {
  return (
    <Card>
      <ProductLink to={`/product/${product.id}`} title={product.title}>
        <ImageContainer>
          <img src={product.image} alt={product.title} />
        </ImageContainer>
        <ProductTitle>{product.title}</ProductTitle>
        <p>${product.price}</p>
      </ProductLink>
    </Card>
  );
};

export default ProductCard;
