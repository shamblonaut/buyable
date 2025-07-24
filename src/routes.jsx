import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
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
