import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import DashboardLayout from "../components/layout/DashboardLayout";
import { role } from "../constants/role";
import AboutPage from "../pages/AboutPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
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
        Component: withAuth(AboutPage),
        path: "about",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children:  [ {index:true, element:<Navigate to={"/admin/analytics"} />},...generateRoute(adminSidebarItems)]
  },
  {
    Component:  withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [{index:true, element:<Navigate to={"/user/bookings"} />},...generateRoute(userSidebarItems)],
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
