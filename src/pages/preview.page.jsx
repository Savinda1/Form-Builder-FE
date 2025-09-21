
import React from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Formpreview from "@/components/Formpreview";
import { AppSidebar } from "@/components/sidebar"
import { Link } from "react-router-dom";
import { Home, FileText, Settings, Eye, Layers,ArrowLeft } from "lucide-react";


//import FormListings from "@/components/FormListings"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function PreviewPage() {
    const { id } = useParams();
  
  const forms = useSelector((state) => state.formdata.forms);

  // Find the selected form BEFORE return
  const selectedForm = forms.find((f) => f._id === id);
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
                  <h1 className='text-xl text-black'>Form Preview</h1></div>
                
                
                  <h1 className='px-7 text-black'>Event Registration</h1>
                </BreadcrumbLink>
               
              </BreadcrumbItem>
             
            </BreadcrumbList>
          </Breadcrumb>
          
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" >
 <Formpreview form={selectedForm} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}



























/*import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Formpreview from "@/components/Formpreview";


export default function PreviewPage() {
  const { id } = useParams();
  
  const forms = useSelector((state) => state.formdata.forms);

  // Find the selected form BEFORE return
  const selectedForm = forms.find((f) => f._id === id);

  return (
    <div>
      <Formpreview form={selectedForm} />
    </div>
  );
}
*/