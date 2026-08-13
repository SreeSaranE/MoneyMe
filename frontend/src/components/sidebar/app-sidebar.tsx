import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ArrowRightLeft, BanknoteCheck, LayoutDashboard, ListSortAscending } from "lucide-react"
import { NavPages } from "./nav-pages"
import { NavUser } from "./nav-user"


const data = {
  user: {
    name: "Atomix",
    email: "atomix@skurd.com",
    avatar: "src/components/sidebar/assets",
  },

  pages: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      url: "/transactions",
      icon: ArrowRightLeft,
    }, 
    {
      name: "Category",
      url: "/category",
      icon: ListSortAscending,
    },
  ],

}


export function AppSidebar() {
  return (
    <Sidebar variant="inset">

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
                    
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BanknoteCheck className="size-4"/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">MoneyMe</span>
                <span className="truncate text-xs">An Skurd's App</span>
              </div>
                    
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <NavPages pages={data.pages} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

    </Sidebar>
  )
}