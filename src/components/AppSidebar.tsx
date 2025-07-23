import { BarChart, BarChart2, BookMinus, Calendar, ChevronDown, Github, Home, User2Icon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"


export default function AppSidebar() {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <User2Icon className="text-2xl" />
                  <h1 className=" font-bold">My App</h1>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          {/* Analytics Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/analytics/todays-orders">
                      <Calendar size={24} />
                      <span>Today's Orders</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/analytics/membership">
                      <Calendar size={24} />
                      <span>Membership Analysis</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/analytics/Customer-Behaviour">
                      <User2Icon size={24} />
                      <span>Customer Behaviour</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/analytics/Sales-and-Order-Trends">
                      <BookMinus size={24} />
                      <span>Sales and Order Trends</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        Product Insight
                        <ChevronDown className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="flex">
                        <Link href="/analytics/product-insights/ProductQuantityChart">
                        <div className="flex gap-4">
                          <BarChart size={24} />
                          <span>Product Quantity Data Table </span>
                        </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/analytics/product-insights/ProductRevenueChart">
                        <div className="flex gap-4">

                          <BarChart size={24} />
                          <span>Product Revenue Data Table</span>
                        </div>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="https://github.com/Amba34" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" className="w-full justify-start">
                    <Github />
                    GitHub
                  </Button>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
