"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import { Globe, Binoculars, Search, Edit3 } from "lucide-react";


export default function Navbar() {
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <Link
            href="https://www.hscore.com"
            className="text-3xl font-serif font-bold tracking-tight text-black"
          >
            Hscore
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 text-sm">
          <button className="hidden sm:flex items-center gap-1 text-muted-foreground hover:text-black transition">
            <Edit3 className="w-4 h-4" />
            Write
          </button>

          <button className="px-4 py-1.5 rounded-full bg-primary text-white font-medium hover:opacity-90 transition">
            Sign up
          </button>

          <button className="text-muted-foreground hover:text-black transition">
            Sign in
          </button>
        </div>
      </div>

      {/* Accent underline */}
      <div className="h-[2px] bg-primary" />
    </header>
  );
}
