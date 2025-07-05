import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/layout/RootLayout";
import Products from "../pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
  },
  {
    path: "/products",
    Component: Products
  }
]);
