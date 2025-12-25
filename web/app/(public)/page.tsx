import Hero from "@/components/public/landing/hero";
import Navbar from "@/components/public/landing/navbar";
import { SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
export default async function Home() {
  const { userId } = await auth();
 
  if (userId) {
    await axios.post("http://localhost:5000/api/user", { userId });
    console.log("user added");
  }

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignOutButton/>
      <Navbar />
      <Hero/>
      
    </div>
  )
}