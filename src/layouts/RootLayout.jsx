import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "../components/Header";
import Navigator from "../components/Navigator";

const GlobalStyle = createGlobalStyle`
  #root {
    min-height: 100svh;
    font-family: Poppins, system-ui, sans-serif;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
  }
`;

const RootLayout = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Navigator />
    </>
  );
};

export default RootLayout;
