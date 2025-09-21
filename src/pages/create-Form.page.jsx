import React from 'react'
import CreateForm from '@/components/CreateForm'
//import Test from '@/components/test'
import { AppSidebar } from "@/components/Sidebar"
//import FormListings from "@/components/FormListings"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom";
import { Home, FileText, Settings, Eye, Layers,ArrowLeft } from "lucide-react";

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function homepage() {
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
         <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
             
                <BreadcrumbLink  >
                 
                  <div className='flex items-center gap-2'> 
                  <Link to="/">
                     <ArrowLeft size={20} />
                      </Link>
                  <h1 className='text-xl text-black'>Create Form</h1></div>
                
                
                  <h1 className='px-7 text-black'>Create your Form</h1>
                </BreadcrumbLink>
               
              </BreadcrumbItem>
             
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" >
<CreateForm/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

