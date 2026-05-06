
import { createBrowserRouter } from "react-router"
import App from "../App"
import AdminLayout from "../components/layout/AdminLayout"
import Analytics from "../components/layout/Analytics"
import AboutPage from "../pages/AboutPage"

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
  }
  
])
