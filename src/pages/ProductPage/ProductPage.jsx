import { useOutletContext, useParams } from "react-router-dom";

import { useFetch } from "@/hooks";

import { BackButton, CartActions, Rating } from "@/components";
import { Page, Info } from "@/styles";
import {
  GlobalStyle,
  ImageContainer,
  Content,
  Notch,
  Details,
  Title,
  Price,
  Description,
  CartActionContainer,
} from "./ProductPage.styles";

const ProductPage = () => {
  const { id } = useParams();

  const {
    data: product,
    error,
    loading,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);

  const { cart, setCart, appPosition } = useOutletContext();

  return (
    <Page>
      <BackButton appPosition={appPosition} />
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
                <Rating
                  rating={product.rating.rate}
                  count={product.rating.count}
                />
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
