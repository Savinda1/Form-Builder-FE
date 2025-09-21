import React from 'react';
import { SignedIn, SignedOut, UserButton,useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Link } from "react-router";
import logo from '@/assets/herop/1.png'
//import { useSelector } from "react-redux";//useSelector is a hook slice ekaka data alocate karanna puluwa
function Navigation() {

const { user } = useUser();//atherization part

  //const userSlice = useSelector(state => state.user); // useSelector is a hook slice ekaka data alocate karanna puluwa
  return (
    <nav className="z-50 bg-sky-700 flex items-center justify-between px-8 text-white py-4 fixed w-full">
    <div className="flex items-center space-x-8">
    <p className="text-2xl font-bold ">
          logo </p>
      
        <div className="hidden md:flex space-x-6 font-bold">
          <Link to={`/`} className="transition-colors text-2xl">
            Home
          </Link>

          {user?.publicMetadata?.role === "admin" && <Link to={`/hotels/create`} className="transition-colors text-2xl">
           Create Hotel
          </Link>}
          <Link to={`/hotels`} className="transition-colors text-2xl">
            Hotels
          </Link>
        </div> 
    </div>

   <div className="flex items-center space-x-4">
       <Button variant="ghost" className="">
          <Globe className="h-5 w-5 mr-2"/>
          EN
        </Button>
        <SignedOut>
        <Button  variant="ghost" asChild>
          <Link to={`/sign-in`}>Log In</Link>
        </Button>
        <Button asChild>
          <Link to={`/sign-up`}>Sign Up</Link>
        </Button>    </SignedOut>

        <SignedIn>
        <UserButton />
          <Button asChild >
            <Link to="/account">My Account</Link>
          </Button>
        </SignedIn>
        </div>
    </nav>
  )
}

export default Navigation;
