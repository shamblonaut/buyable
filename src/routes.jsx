import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";

import HomePage from "./pages/HomePage";

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
    ],
  },
];

export default routes;
