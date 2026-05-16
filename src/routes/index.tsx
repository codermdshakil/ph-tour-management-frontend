import { createBrowserRouter } from "react-router";
import App from "../App";
import DashboardLayout from "../components/layout/DashboardLayout";
import AboutPage from "../pages/AboutPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verify from "../pages/Verify";
import { generateRoute } from "../utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    // element:<App/>,
    Component: App,
    path: "/",
    children: [
      {
        Component: AboutPage,
        path: "about",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoute(adminSidebarItems)]
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [...generateRoute(userSidebarItems)],
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
]);
