import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom"; 
import { SignedIn, SignedOut, UserButton,useUser } from "@clerk/clerk-react";


export default function Dashboard() {
     const { user } = useUser();
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome to Form Builder 👋
          </h1>
          <div className="flex gap-3">
            <SignedOut>
            <Link to="/sign-in">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn size={18} /> Sign In
            </Button>
            </Link>
            <Link to="sign-up">
            <Button className="flex items-center gap-2">
              <UserPlus size={18} /> Sign Up
            </Button>
            </Link>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Optional Quick Action Section */}
        <section className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Get Started</h2>
          <p className="text-gray-600 mb-4">
            Create new forms, manage existing ones, and view submissions.
          </p>
          <Link to="/Form/create" >
          <Button className="px-6 py-2">Create New Form</Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
