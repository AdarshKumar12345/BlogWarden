import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthSession } from "@/lib/authOptions";
import SignOut from "./signOut";

export default async function Navbar() {
  const session = await getAuthSession()


  return (
    <nav className="w-full bg-black text-white px-4 sm:px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Sidebar + Logo */}
        <div className="flex items-center gap-3 sm:gap-5">
          <SidebarTrigger>
            <Menu className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:text-gray-300 transition" />
          </SidebarTrigger>

          <Link href="/" className="text-1xl sm:text-3xl font-extrabold tracking-wide">
            BlogWarden
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Navigation links - hidden on screen width < 768px (phones/tablets) */}
          <div className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/blog" className="hover:text-gray-300 transition">
              Blog
            </Link>
            <Link href="/about" className="hover:text-gray-300 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition">
              Contact
            </Link>
          </div>

          {
            session?
             ( <UserDropdown user={session?.user} />)
              :(<Link href= "/signIn">Sign In</Link>)


          }
          
        </div>
      </div>
    </nav>
  );
}

const UserDropdown = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Image
            src={user.image}
            alt="user Image"
            height={36}
            width={36}
            className="rounded-full cursor-pointer border border-white hover:scale-105 transition"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black text-white w-40 mt-2 border-1 border-gray-400" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
           <SignOut/>

        </DropdownMenuItem>
        
        


      </DropdownMenuContent>
    </DropdownMenu>
  );
};
