import App from "./App";

import {
  HomePage,
  ShopPage,
  ProductPage,
  CartPage,
  DisclaimerPage,
  ErrorPage,
} from "./pages";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "disclaimer",
        element: <DisclaimerPage />,
      },
    ],
  },
];

export default routes;
