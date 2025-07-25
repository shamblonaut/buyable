import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import useFetch from "../hooks/useFetch";

import Header from "../components/Header";
import Navigator from "../components/Navigator";

const GlobalStyle = createGlobalStyle`
  #root {
    min-height: calc(100svh - 64px);
    font-family: Poppins, system-ui, sans-serif;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
  }
`;

const RootLayout = () => {
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products",
  );

  const [cart, setCart] = useState({});

  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet
        context={{
          productsData: data,
          productsError: error,
          productsLoading: loading,
          cart,
          setCart,
        }}
      />
      <Navigator />
    </>
  );
};

export default RootLayout;
