import { useParams } from "react-router-dom";

import { useFetch } from "@/hooks";

import { ImageContainer, Info } from "./ProductPage.styles";

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
