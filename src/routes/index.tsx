import { createBrowserRouter } from "react-router";
import App from "../App";
import DashboardLayout from "../components/layout/DashboardLayout";
import AboutPage from "../pages/AboutPage";
import Analytics from "../pages/Admin/Analytics";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Bookings from "../pages/User/Bookings";
import Verify from "../pages/Verify";

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
    children: [
      {
        path: "analytics",
        Component: Analytics,
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {
        path: "bookings",
        Component: Bookings,
      },
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
]);
