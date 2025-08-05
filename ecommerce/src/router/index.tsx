import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/layout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/Auth/Register";
import Cart from "../pages/Cart";
import Shop from "../pages/Products";
import Error from "../components/Error/Error";
import Product from "../pages/Product";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/Home";
import ProductsDashboard from "../pages/dashboard/products/ProductsDashboard";
import AddProduct from "../pages/dashboard/products/AddProduct";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: (
      <Error code={500} message="Error" description="Something went wrong" />
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/shop/*",
        Component: Shop,
      },
      {
        path: "/:brand/:documentId",
        Component: Product,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/login",
        element: <ProtectedRoute reverse path="/" children={<Login />} />,
      },
      {
        path: "/register",
        element: <ProtectedRoute reverse path="/" children={<Register />} />,
      },
    ],

  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "products",
        Component: ProductsDashboard,
      },
      {
        path: "products/create/:editProductId?",
        Component: AddProduct,
      },
    ],
  },
]);

