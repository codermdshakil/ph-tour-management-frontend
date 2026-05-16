import type { ISidebarItemsArray } from "../types";


export const generateRoute = (sidebarItems: ISidebarItemsArray[]) => {
  return sidebarItems.flatMap((group) =>
    group.items.map((item) => ({
      path:item.url,
      Component:item.Component
    }))
  );
};