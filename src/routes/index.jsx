import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cashier from "../cashier/page";
import Dashboard from "../admin/dashboard/page";
import ADLogin from "../admin/login/page";
import Login from "../auth/login/page";
import Register from "../auth/register/page";
import Verify from "../auth/verify/page";
import Home from "../Home";
import Authlayout from "../component/Authlayout";
import Four00 from "../component/Four00";
import Four04 from "../component/Four04";
import Loading from "../component/Loading";
import Reciept from "../component/Reciept";

function MainRoute() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Four00 />,
      element: (
        <Suspense fallback={Loading}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/cashier",
      errorElement: <Four00 />,
      element: (
        <Suspense fallback={Loading}>
          <Cashier />,
        </Suspense>
      ),
    },
    {
      path: "/auth",
      errorElement: <Four00 />,
      element: <Authlayout />,
      children: [
        {
          path: "login",
          errorElement: <Four00 />,
          element: (
            <Suspense fallback={Loading}>
              <Login />,
            </Suspense>
          ),
        },
        {
          path: "register",
          errorElement: <Four00 />,
          element: (
            <Suspense fallback={Loading}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "verify",
          errorElement: <Four00 />,
          element: (
            <Suspense fallback={Loading}>
              <Verify />,
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <Four04 />,
        },
      ],
    },
    {
      path: "/admin/dashboard",
      errorElement: <Four00 />,
      element: (
        <Suspense fallback={Loading}>
          <Dashboard />,
        </Suspense>
      ),
    },
    {
      path: "/reciept",
      element: <Reciept />,
    },
    {
      path: "/admin/login",
      errorElement: <Four00 />,
      element: (
        <Suspense fallback={Loading}>
          <ADLogin />,
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <Four04 />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default MainRoute;
