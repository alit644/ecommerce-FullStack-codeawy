import { lazy, Suspense, type LazyExoticComponent } from "react";
import type { JSX } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/layout/RootLayout";
import Home from "../pages/Home";
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
import ProtectedRoute from "../components/ProtectedRoute";
const Cart = lazy(() => import("../pages/Cart"));
const Shop = lazy(() => import("../pages/Products"));
import Error from "../components/Error/Error";
const Product = lazy(() => import("../pages/Product"));
const DashboardLayout = lazy(
  () => import("../pages/dashboard/DashboardLayout")
);
import DashboardHome from "../pages/dashboard/Home";
const ProductsDashboard = lazy(
  () => import("../pages/dashboard/products/ProductsDashboard")
);
const CategoriesDashboard = lazy(
  () => import("../pages/dashboard/categories/categoriesDashboard")
);
const AddProduct = lazy(() => import("../pages/dashboard/products/AddProduct"));
const AddCategory = lazy(
  () => import("../pages/dashboard/categories/AddCategory")
);
const Orders = lazy(() => import("../pages/dashboard/orders/orders"));
const OrderDetails = lazy(
  () => import("../pages/dashboard/orders/OrderDetails")
);
const Checkout = lazy(() => import("../pages/Checkout"));
const IsOrderCompleted = lazy(
  () => import("../components/orders/isOrderCompleted")
);
const MyOrders = lazy(() => import("../pages/Profile/myOrders"));
const ProfileLayout = lazy(() => import("../pages/layout/ProfileLayout"));
import PageLoader from "../components/ui/PageLoader";
const withSuspense = (Component: LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<PageLoader />}>{<Component />}</Suspense>
);
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
        Component: () => withSuspense(Shop),
      },
      {
        path: "/:brand/:documentId",
        Component: () => withSuspense(Product),
      },
      {
        path: "/cart",
        Component: () => withSuspense(Cart),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute reverse path="/" children={<Login />} />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute reverse path="/" children={<Register />} />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute path="/login" children={<Checkout />} />
          </Suspense>
        ),
      },
      {
        path: "/isOrderCompleted",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute path="/login" children={<IsOrderCompleted />} />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute path="/login" children={<ProfileLayout />} />
          </Suspense>
        ),
        children: [
          {
            index: true,
            Component: () => withSuspense(MyOrders),
          },
          {
            path: "myOrders",
            Component: () => withSuspense(MyOrders),
          },
          {
            path: "orders/order-details/:documentId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute path="/login" children={<OrderDetails context="profile" />} />
              </Suspense>
            ),
          },
        ],
      },
     
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ProtectedRoute path="/login" children={<DashboardLayout />} />
      </Suspense>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "products",
        Component: () => withSuspense(ProductsDashboard),
      },
      {
        path: "products/create/:editProductId?",
        Component: () => withSuspense(AddProduct),
      },
      {
        path: "categories",
        Component: () => withSuspense(CategoriesDashboard),
      },
      {
        path: "categories/create/:editCategoryId?",
        Component: () => withSuspense(AddCategory),
      },
      {
        path: "orders",
        Component: () => withSuspense(Orders),
      },
      {
        path: "orders/order-details/:documentId",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute path="/login" children={<OrderDetails context="dashboard" />} />
          </Suspense>
        ),
      },
      
    ],
    
  },
]);
