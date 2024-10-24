import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import paths from "@/utils/constants/paths";
import RootLayout from "@/layouts/RootLayout";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import BuildPC from "@/pages/BuildPC";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: paths.HOME,
    element: <RootLayout />,
    children: [
      {
        path: paths.HOME,
        element: <Home />,
      },
      {
        path: `${paths.PRODUCTS}/:slug`,
        element: <ProductDetails />,
      },
      {
        path: paths.CART,
        element: <Cart />,
      },
      {
        path: paths.BUILD_PC,
        element: <BuildPC />,
      },
      {
        path: paths.CHECKOUT,
        element: <Checkout />,
      },
      {
        path: paths.LOGIN,
        element: <Login />,
      },
      {
        path: paths.REGISTER,
        element: <Register />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
