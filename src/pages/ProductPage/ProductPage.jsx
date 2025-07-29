import { useOutletContext, useParams } from "react-router-dom";

import { useFetch } from "@/hooks";

import {
  GlobalStyle,
  Page,
  Info,
  ImageContainer,
  Content,
  Notch,
  Details,
  Title,
  Price,
  Description,
  CartActionContainer,
} from "./ProductPage.styles";
import { CartActions } from "@/components";

const ProductPage = () => {
  const { id } = useParams();

  const {
    data: product,
    error,
    loading,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);

  const { cart, setCart } = useOutletContext();

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
              <Details>
                <Title>{product.title}</Title>
                <Price>${product.price}</Price>
                <Description>{product.description}</Description>
              </Details>
              <CartActionContainer>
                <CartActions product={product} cart={cart} setCart={setCart} />
              </CartActionContainer>
            </Content>
          </>
        )
      )}
    </Page>
  );
};

export default ProductPage;
