
import { createBrowserRouter } from "react-router"
import App from "../App"
import AdminLayout from "../components/layout/AdminLayout"
import Analytics from "../components/layout/Analytics"
import AboutPage from "../pages/AboutPage"
import Login from "../pages/Login"
import Register from "../pages/Register"

export const router = createBrowserRouter([
  {
    // element:<App/>,
    Component:App,
    path:"/",
    children:[
      {
        Component:AboutPage,
        path:"about"
      }
    ]
  },
  {
    Component:AdminLayout,
    path:"/admin",
    children:[
      {
        path:"analytics",
        Component:Analytics
      }
    ]
  },
  {
    Component:Login,
    path:"/login"
  },
  {
    Component:Register,
    path:"/register"
  }
  
])
