
import { createBrowserRouter } from "react-router"
import App from "../App"
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
    
  }
  
])
