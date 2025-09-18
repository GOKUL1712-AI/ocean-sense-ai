import { useState } from "react";
import { 
  Home, 
  MessageSquare, 
  Database, 
  BarChart3, 
  History, 
  Activity,
  Waves,
  Navigation
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Chat Interface", url: "/chat", icon: MessageSquare },
  { title: "Data Processing", url: "/data", icon: Database },
  { title: "Visualizations", url: "/dashboard", icon: BarChart3 },
  { title: "Query History", url: "/history", icon: History },
  { title: "System Status", url: "/status", icon: Activity },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-accent/20 text-accent font-medium border-r-2 border-accent" 
      : "hover:bg-muted/50 hover:text-foreground";

  return (
    <Sidebar className="border-r border-border bg-gradient-foam">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-ocean rounded-lg">
              <Navigation className="h-6 w-6 text-white" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="text-lg font-semibold text-foreground">OceanGPT</h2>
                <p className="text-sm text-muted-foreground">Oceanographic AI</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass}
                      end={item.url === "/"}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {state !== "collapsed" && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="p-4 bg-gradient-surface rounded-lg mx-2 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Waves className="h-4 w-4 text-accent animate-float" />
                  <span className="text-sm font-medium">System Online</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All oceanographic data systems are operational
                </p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}