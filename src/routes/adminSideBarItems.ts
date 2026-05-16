import AddTour from "../pages/Admin/AddTour";
import AddTourType from "../pages/Admin/AddTourType";
import Analytics from "../pages/Admin/Analytics";
import Habijabi from "../pages/Admin/Habijabi";
import type { ISidebarItemsArray } from "../types";

export const adminSideBarItems : ISidebarItemsArray[] = [
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
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        Component:AddTourType
      },
      {
        title: "habojabi",
        url: "/admin/habijabi",
        Component:Habijabi
      },
    ],
  },
];
