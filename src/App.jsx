import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AppPosition } from "@/utils/constants";

import { useFetch, useLocalStorage } from "@/hooks";

import { Header, Navigator } from "@/components";
import { RootStyle } from "@/styles";

const App = () => {
  const productsData = useFetch("https://fakestoreapi.com/products");
  const [cart, setCart] = useLocalStorage("cart", {});

  const [appPosition, setAppPosition] = useState(AppPosition.HOME);

  return (
    <>
      <RootStyle />
      <Header />
      <Outlet
        context={{
          productsData,
          cart,
          setCart,
          appPosition,
          setAppPosition,
        }}
      />
      <Navigator
        appPosition={appPosition}
        cartCount={Object.values(cart).reduce(
          (sum, current) => sum + current,
          0,
        )}
      />
    </>
  );
};

export default App;
