import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { CartContext } from "@/contexts";
import { useFetch, useLocalStorage } from "@/hooks";

import { Header, Navigator } from "@/components";
import { RootStyle } from "@/styles";

const App = () => {
  const productsData = useFetch("https://fakestoreapi.com/products");
  const [cart, setCart] = useLocalStorage("cart", {});

  const [appPosition, setAppPosition] = useState(AppPosition.HOME);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <RootStyle />
      <Header />
      <Outlet
        context={{
          productsData,
          appPosition,
          setAppPosition,
        }}
      />
      <Navigator appPosition={appPosition} />
    </CartContext.Provider>
  );
};

export default App;
