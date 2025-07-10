import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/layout/RootLayout";
import Products from "../pages/Products";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
          path: "/products",
        Component: Products,
      }
    ],
  },
]);
