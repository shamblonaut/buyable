import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "../components/Header";
import Navigator from "../components/Navigator";

import useFetch from "../hooks/useFetch";

const GlobalStyle = createGlobalStyle`
  #root {
    min-height: 100svh;
    font-family: Poppins, system-ui, sans-serif;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
  }
`;

const RootLayout = () => {
  const { data, error, loading } = useFetch(
    "https://fakestoreapi.com/products",
  );

  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet
        context={{
          productsData: data,
          productsError: error,
          productsLoading: loading,
        }}
      />
      <Navigator />
    </>
  );
};

export default RootLayout;
