import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import DashboardLayout from "../components/layout/DashboardLayout";
import { role } from "../constants/role";
import AboutPage from "../pages/AboutPage";
import Booking from "../pages/Booking";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import TourDetails from "../pages/TourDetails";
import Tours from "../pages/Tours";
import Unauthorized from "../pages/Unauthorized";
import Verify from "../pages/Verify";
import type { TRole } from "../types";
import { generateRoute } from "../utils/generateRoutes";
import { withAuth } from "../utils/withAuth";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    // element:<App/>,
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: withAuth(AboutPage),
        path: "about",
      },
      {
        Component: withAuth(Tours),
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
         Component: withAuth(Booking),
        path: "booking/:id",
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"} /> },
      ...generateRoute(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to={"/user/bookings"} /> },
      ...generateRoute(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
