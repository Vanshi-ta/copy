import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import { Globe, Binoculars } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 py-3 md:py-4 px-4 md:px-10 flex items-center justify-between bg-white text-black sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
         <Link href="/" className="flex items-center gap-2">
            {/* Visual proxy for the Owl logo */}
            <div className="bg-black text-white p-1 rounded-full">
                {/* <Binoculars className="w-6 h-6 fill-current" />  */}
            </div>
            <span className="text-2xl font-extrabold tracking-tight">trpc</span>
         </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-[16px] font-medium text-gray-900">
        <Link href="#" className="hover:text-black hover:opacity-70 transition-opacity">Discover</Link>
        <Link href="/blog" className="hover:text-black hover:opacity-70 transition-opacity">Blogs</Link>
        <Link href="#" className="hover:text-black hover:opacity-70 transition-opacity">Guides</Link>
        <Link href="#" className="hover:text-black hover:opacity-70 transition-opacity">About</Link>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors font-semibold text-sm">
            <Globe className="w-5 h-5" />
            <span className="text-gray-300">|</span>
            <span>INR</span>
        </button>
        <Button className="rounded-full bg-black text-white px-5 hover:bg-black/80 font-semibold text-sm h-10">
            Sign in
        </Button>
      </div>
    </nav>
  );
}
