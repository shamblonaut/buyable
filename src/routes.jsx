import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
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
    ],
  },
];

export default routes;
