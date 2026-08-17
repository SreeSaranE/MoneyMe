import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toast"
import { ThemeProvider } from "@/components/theme/theme-provider";

export default function AppLayout() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <Outlet />
          </main>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
    </div>
  );
}