"use client"
// Update the import path below to the correct location of Sidebar, for example:
import { LayoutDashboard,Bot, Presentation, CreditCard, Plus } from "lucide-react";
import { Button } from '../../components/ui/button'
import { Sidebar, SidebarContent,SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarMenuItem,SidebarMenu, useSidebar } from "../../components/ui/sidebar";
import Link from "next/link";
import Image from 'next/image'
import { usePathname } from "next/navigation";
// Or provide the correct relative/absolute path as per your project structure.


const items = [
      {
      title:"Dashboard",
      url:"/dashboard",
      icon:LayoutDashboard
      },
            {
      title:"Q&A",
      url:"/qa",
      icon:Bot,
      },
            {
      title:"Meeting",
      url:"/mettings",
      icon:Presentation,
      },
            {
      title:"Billing",
      url:"/billing",
      icon:CreditCard,
      }
]

const projects = [
      {
            id:1,
            name: "Project 1"
},
{           id:2,
            name: "Project 2"
},
{           id:3,
            name: "Project 3"
},
{           id:4,
            name: "Project 4"
}

]


export function AppSidebar() {
      const pathname = usePathname();
      const { open } = useSidebar()
      return (
            <>
                  <Sidebar collapsible="icon" variant="floating" >
                  <SidebarHeader>
                        <div className="flex items-center gap-2">
                              <Image src ='/logo.png' alt='logo' width={40} height={40} />
                              { open && (
                              <h1 className="text-xl font-bold text-primary/80">
                              Workflow
                              </h1>
                              )}

                        </div>
                  </SidebarHeader>
                  <SidebarContent >
                        <SidebarGroup>
                              <SidebarGroupLabel>
                                    Application
                              </SidebarGroupLabel>
                              <SidebarGroupContent>
                                    <SidebarMenu>
                                    {items.map(item => {
                                          const Icon = item.icon;
                                            function cn(...args: (Record<string, boolean> | string)[]): string {
                                                      return args
                                                            .map(arg => {
                                                                  if (typeof arg === 'string') return arg;
                                                                  return Object.entries(arg)
                                                                        .filter(([_, value]) => value)
                                                                        .map(([key]) => key)
                                                                        .join(' ');
                                                            })
                                                            .filter(Boolean)
                                                            .join(' ')
                                                            .trim();
                                            }

                                          return (
                                                <SidebarMenuItem key={item.title}>
                                                      <SidebarMenuButton asChild>
                                                            <Link href={item.url} className={cn({
                                                                  '!bg-secondary !text-primary': pathname ===  item.url
                                                            },'list-none')}>
                                                                  <item.icon/>
                                                                  <span>{item.title}</span>
                                                            </Link>
                                                      </SidebarMenuButton>
                                                      
                                                </SidebarMenuItem>
                                          )
                                    })}
                                    </SidebarMenu>
                              </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup >
                              <SidebarGroupLabel>
                                    Your projects 
                                    </SidebarGroupLabel>
                                    <SidebarMenu>
                                          {projects.map(project => {
                                                function cn(...args: (Record<string, boolean> | string)[]): string {
                                                      return args
                                                            .map(arg => {
                                                                  if (typeof arg === 'string') return arg;
                                                                  return Object.entries(arg)
                                                                        .filter(([_, value]) => value)
                                                                        .map(([key]) => key)
                                                                        .join(' ');
                                                            })
                                                            .filter(Boolean)
                                                            .join(' ')
                                                            .trim();
                                                }

                                                return (
                                                      <SidebarMenuItem key={project.name}>
                                                            <SidebarMenuButton asChild>
                                                                  <div>
                                                                        <div
                                                                          className={cn(
                                                                            'rounded-sm  size-6 flex items-center justify-center text-sm bg-white text-primary',
                                                                            {
                                                                              // Highlight logic placeholder: replace 'selectedProjectId' with your actual selected project id state
                                                                              '!bg-primary !text-white': true
                                                                        
                                                                            }
                                                                          )}
                                                                        >
                                                                          {project.name[0]}
                                                                        </div>
                                                                        <span>{project.name}</span>

                                                                  </div>
                                                            </SidebarMenuButton>
                                                      </SidebarMenuItem>
                                                )
                                          })}

                  

                                          <div className="h-2 mt-4">
                              { open && (
                                                <SidebarMenuItem>
                                                      <Link href='/create'>
                                                <Button variant={'outline'} className="fit">
                                                    <Plus />  Create Project 
                                                      </Button>
                                                      </Link>
                                                      </SidebarMenuItem>
                              )}
                                          </div>
                                    </SidebarMenu>
                        </SidebarGroup>
                  </SidebarContent>
                  </Sidebar>

            </>
      )
}