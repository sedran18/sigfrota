'use client';

import { useState } from "react";
import { Menu as MenuBtn } from "lucide-react";
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

const MenuMobile = ({ userName, isAdmin }: { userName: string; isAdmin: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        md:hidden
        fixed top-0 left-0 right-0 z-40
        h-14
        flex items-center justify-between
        px-4
        bg-white border-b border-slate-200
      "
    >
        <div className="relative h-8 w-10">
          <Image
            src="/logo.png"
            alt="Logo Institucional"
            fill
            sizes="96px"
            className="object-contain"
            priority
          />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-[#093a1c]">
          SIGFROTA
        </span>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger 
          className="p-2 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors outline-none cursor-pointer "
          aria-label="Abrir Menu"
        >
          <MenuBtn size={20} />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="
            flex flex-col justify-between
            h-full w-[280px] sm:w-[320px]
            p-0
            border-l border-slate-200 bg-white
          "
        >
          <div className="flex flex-col flex-1 min-h-0">
            <div className="h-1.5 w-full bg-[#093a1c] shrink-0" />
            
            <SheetHeader className="p-4 text-left border-b border-slate-100 bg-slate-50 shrink-0">
              <SheetTitle className="text-xs font-bold text-slate-800 tracking-widest uppercase">
                Menu de Navegação
              </SheetTitle>
            </SheetHeader>

            <div 
              className="flex-1 overflow-y-auto py-2"
              onClick={() => setOpen(false)} 
            >
              <NavLinks isAdmin={isAdmin} />
            </div>
          </div>

          <div className="shrink-0 border-t border-slate-200">
            <UserProfile userName={userName} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MenuMobile;