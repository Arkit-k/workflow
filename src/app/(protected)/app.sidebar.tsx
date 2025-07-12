"use client"
import { LayoutDashboard, Bot, Presentation, CreditCard, Plus } from "lucide-react";
import { Button } from '../../components/ui/button'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarMenuItem, SidebarMenu, useSidebar } from "../../components/ui/sidebar";
import Link from "next/link";
import useProject from "~/hooks/use-project";
import Image from 'next/image'
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meeting",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  }
];

function cn(...args: (string | Record<string, boolean>)[]): string {
  return args
    .flatMap(arg => 
      typeof arg === 'string' 
        ? arg 
        : Object.entries(arg)
            .filter(([_, value]) => value)
            .map(([key]) => key)
    )
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId, isLoading } = useProject();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src='/logo.png' alt='logo' width={40} height={40} />
          {open && (
            <h1 className="text-xl font-bold text-primary/80">
              Workflow
            </h1>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Navigation Items */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild active={isActive}>
                      <Link href={item.url} className="flex items-center gap-2">
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Your projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <SidebarMenuItem key={`loading-${i}`}>
                    <SidebarMenuButton>
                      <div className="flex items-center gap-2">
                        <div className="rounded-sm size-6 bg-muted animate-pulse" />
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                projects?.map((project) => {
                  const isActive = project.id === projectId;
                  
                  return (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton 
                        onClick={() => setProjectId(project.id)}
                        active={isActive}
                      >
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            'rounded-sm size-6 flex items-center justify-center text-sm',
                            {
                              'bg-primary text-white': isActive,
                              'bg-muted text-foreground': !isActive
                            }
                          )}>
                            {project.name[0]?.toUpperCase()}
                          </div>
                          <span className="truncate">{project.name}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })
              )}

              {/* Create Project Button */}
              {open && (
                <SidebarMenuItem className="mt-4">
                  <Link href='/create' className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="size-4" />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}