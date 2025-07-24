import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import routes from "./routes";

import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>,
);
