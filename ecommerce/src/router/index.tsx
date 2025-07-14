import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/layout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/Auth/Register";
import Cart from "../pages/Cart";
import Shop from "../pages/Products";
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
        path: "/shop",
        Component: Shop,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/login",
        // Component : Login,
        element: <ProtectedRoute reverse path="/" children={<Login />} />,
      },
      {
        path: "/register",
        element: <ProtectedRoute reverse path="/" children={<Register />} />,
      },
    ],
  },
]);
