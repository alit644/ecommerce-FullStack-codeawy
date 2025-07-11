import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/layout/RootLayout";
import Products from "../pages/Products";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/Auth/Register";
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
      },
      {
        path: "/login",
        // Component : Login,
        element: <ProtectedRoute reverse  path="/" children={<Login/>} />,
      },
      {
        path: "/register",
        element: <ProtectedRoute reverse  path="/" children={<Register/>} />,
      }
    ],
  },
]);
