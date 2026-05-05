
import { createBrowserRouter } from "react-router"
import App from "../App"
import AdminLayout from "../components/layout/AdminLayout"
import AboutPage from "../pages/AboutPage"
import Analytics from "../pages/Analytics"

export const router = createBrowserRouter([
  {
    // element:<App/>,
    Component:App, // component way is best
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
