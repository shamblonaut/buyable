import { useParams } from "react-router-dom";

import { useFetch } from "@/hooks";

import {
  GlobalStyle,
  Page,
  Info,
  ImageContainer,
  Content,
  Notch,
  Title,
  Price,
  Description,
} from "./ProductPage.styles";

const ProductPage = () => {
  const { id } = useParams();

  const {
    data: product,
    error,
    loading,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);

  return (
    <Page>
      {loading ? (
        <Info>Loading product...</Info>
      ) : error ? (
        <Info>Product not found!</Info>
      ) : (
        product && (
          <>
            <GlobalStyle />
            <ImageContainer>
              <img src={product.image} alt={product.title} />
            </ImageContainer>
            <Content>
              <Notch />
              <Title>{product.title}</Title>
              <Price>${product.price}</Price>
              <Description>{product.description}</Description>
            </Content>
          </>
        )
      )}
    </Page>
  );
};

export default ProductPage;
