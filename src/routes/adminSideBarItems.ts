import { lazy } from "react";
import AddDivision from "../pages/Admin/AddDivision";
import AddTourType from "../pages/Admin/AddTourType";
import type { ISidebarItemsArray } from "../types";

const Analytics = lazy(() => import("../pages/Admin/Analytics"))
const AddTour = lazy(() => import("../pages/Admin/AddTour"))
// const AddTourType = lazy(() => import("../pages/Admin/AddTourType"))

export const adminSidebarItems : ISidebarItemsArray[] = [
  {
    title: "Deshboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component:Analytics
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        Component:AddTour
      },
      {
        title:"Add Division",
        url:"/admin/add-division",
        Component:AddDivision
      },
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        Component:AddTourType
      },
       
      
    ],
  },
];
