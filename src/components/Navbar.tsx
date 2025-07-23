'use client';
import { useState } from 'react';
import { BookMinus, Home,  Moon, Sun, UserRoundPen} from 'lucide-react'; // Icons

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { SidebarTrigger } from './ui/sidebar';
import { Input } from './ui/input';


const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Questions",
    url: "/questions",
    icon: BookMinus,
  },
  {
    title: "Profile",
    url: "/users/Ambadas",
    icon: UserRoundPen,
  },
]


export default function Navbar() {
  const {  setTheme } = useTheme();
    const [query, setQuery] = useState("")

  return (
    <>
      <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-10 ">
        <div className="flex flex-row items-center">
          <SidebarTrigger />
          <span className="ml-2 text-xl font-semibold">Dashboard</span>
        </div>
        <div className='flex px-4 gap-4'>


          
          <div className="w-full max-w-md mx-auto">
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="">
                <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar></DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
            {(items.map((item) => (
              <DropdownMenuItem key={item.title}>
                <Button variant ="ghost" size={"sm"} className="w-full justify-start">
                  <Link href={item.url}>
                    <span>{item.title}</span>
                    </Link>
                </Button>
              </DropdownMenuItem>
            )))}
            </DropdownMenuContent>
          </DropdownMenu>



        </div>
      </nav>

    </>
  );
}
