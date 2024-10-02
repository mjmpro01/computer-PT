import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import paths from "@/utils/constants/paths";
import RootLayout from "@/layouts/RootLayout";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";

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
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
