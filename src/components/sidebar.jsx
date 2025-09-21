import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Home, FileText, Settings, Eye, Layers,ArrowLeft } from "lucide-react";

const data = {
  navMain: [
    {
      items: [
        { title: "Dashboard", url: "#", icon: Home },
        { title: "Forms", url: "/", icon: FileText },
        { title: "Form Builder", url: "#", icon: Layers },
        { title: "Submissions", url: "/Form/submition", icon: FileText },
        { title: "Preview", url: "#", icon: Eye },
        { title: "Settings", url: "#", icon: Settings },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      {...props}
      className="bg-gray-50 dark:bg-gray-900 w-64 min-h-screen shadow-md"
    >
      {/* Sidebar Header */}
      <SidebarHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Form Builder
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Manage your forms
          </span>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="px-2 py-4">
        {data.navMain.map((group, idx) => (
          <SidebarGroup key={idx} className="mb-4">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        className={`flex items-center px-3 py-8 rounded-md transition-colors duration-200 ${
                          item.isActive
                            ? "bg-white text-blue-600 font-medium border-l-4 border-blue-600"
      : "text-gray-700 hover:bg-blue-800 hover:text-white dark:text-gray-300 dark:hover:bg-blue-700"
                        }`}
                      >
                        <Link to={item.url} className="flex items-center space-x-2">
                          {Icon && <Icon className="w-5 h-5" />}
                          <span className="text-xl ">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Sidebar Rail */}
      <SidebarRail className="bg-gray-100 dark:bg-gray-800" />
    </Sidebar>
  );
}
