import { useState } from "react";
import {
  PlusSquare

} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import FormListings from "./FormListings";
export default function Hero() {


  return (
    <div className="flex">
          {/* Main Content */}
      <div className="flex-1 p-7 mt-16 md:mt-0">
            <div className='flex items-center justify-between mb-8'>
              <div className="space-y-1">
                  <h1 className="text-3xl font-bold ">Form</h1>
        <h1>Manage your forms and view submissions</h1>
              </div>
      
        <Link to="/Form/create">
        
         <Button className="mb-4 bg-blue-700 " > 
                  < PlusSquare size={20} />
            <span>Create Form</span>
            </Button>
        
        </Link>
               
            </div>
        <FormListings/>
      </div>
    </div>
  );
}
