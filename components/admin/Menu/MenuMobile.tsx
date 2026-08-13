'use client'

import {  Menu as MenuBtn } from "lucide-react"; 
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";
import { Paginas } from "@/lib/types";

const MenuMobile = ({userName, isAdmin}: {userName: string, isAdmin: boolean}) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 grid grid-cols-3 items-center z-40">
        <div className="flex items-center justify-start">
            <div className="h-15 relative w-24 sm:w-28">
            <Image 
                src="/logo.png" 
                alt='Logo Curto'
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain object-left"
                priority
            />
            </div>
        </div>

        <div className="flex items-center justify-center">
          <p
            className="
              text-sm
              font-extrabold
              uppercase
              tracking-[0.3em]
              text-slate-700
              select-none
            "
          >
            <span className="text-[var(--primary-color)]">SIG</span>FROTA
          </p>
        </div>
        <div className="flex items-center justify-end">
            <Sheet>
            <SheetTrigger className="p-2 text-slate-600 hover:bg-slate-100 active:bg-slate-200 rounded-md transition-colors cursor-pointer outline-none">
                <MenuBtn size={24} />
            </SheetTrigger>
            
            <SheetContent side="right" className="p-0 flex flex-col border-none shadow-xl bg-white justify-between h-full w-[70%] sm:w-[60%]">
                <div className="flex flex-col">
                <SheetHeader className="p-6 text-left border-b border-slate-100">
                    <SheetTitle className="text-sm font-semibold text-slate-500 tracking-wider uppercase">
                    Navegação
                    </SheetTitle>
                </SheetHeader>
                
                <NavLinks isAdmin={isAdmin}/>
                </div>

                <UserProfile userName={userName}/>
            </SheetContent>
            </Sheet>
        </div>
    </header>
  )
}

export default MenuMobile
