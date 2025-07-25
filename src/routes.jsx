import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

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
    ],
  },
];

export default routes;
