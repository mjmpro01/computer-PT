import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "../components/layout/RootLayout";
import paths from "../utils/constants/paths";
import variables from "../utils/constants/variables";
import Home from "../page/Home";
import Login from "../page/Login";

<Navigate to={paths.LOGIN} />;

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem(variables.ACCESS_TOKEN);

  if (!accessToken) {
    localStorage.removeItem(variables.ACCESS_TOKEN);
    localStorage.removeItem(variables.PROFILE);
    return <Navigate to={paths.LOGIN} />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: paths.LOGIN,
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: paths.HOME,
        element: <RootLayout />,
        children: [
          {
            path: paths.HOME,
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
