import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toast"

export default function AppLayout() {
  return (
    <div>
      <SidebarProvider>
      <AppSidebar />

      <main>
        <SidebarTrigger />

        <Outlet />
        
      </main>
    </SidebarProvider>

    <Toaster />
    </div>
    
  );
}