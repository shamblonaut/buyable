import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: "Hello, World!",
      },
    ],
  },
];

export default routes;
