import { useParams } from "react-router-dom";
import styled from "styled-components";

import useFetch from "../hooks/useFetch";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px;

  & img {
    width: auto;
    max-height: 360px;
  }
`;

const Info = styled.p`
  text-align: center;
`;

const ProductPage = () => {
  const { id } = useParams();

  const {
    data: product,
    error,
    loading,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);

  return (
    <main>
      {loading ? (
        <Info>Loading product...</Info>
      ) : error ? (
        <Info>Product not found!</Info>
      ) : (
        product && (
          <>
            <ImageContainer>
              <img src={product.image} alt={product.title} />
            </ImageContainer>
            <h2>{product.title}</h2>
            <p>${product.price}</p>
          </>
        )
      )}
    </main>
  );
};

export default ProductPage;
