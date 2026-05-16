import { Outlet } from "react-router";
import { adminSideBarItems } from "../../routes/adminSideBarItems";
import { generateRoute } from "../../utils/generateRoutes";
import { AppSidebar } from "../app-sidebar";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const DashboardLayout = () => {

  const result = generateRoute(adminSideBarItems);
  console.log(result, "hit.");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
           
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
           <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;