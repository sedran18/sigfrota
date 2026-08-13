'use client'

import Image from "next/image";
import { paginas } from "@/lib/data/paginas";
import { usePathname } from "next/navigation";
import {  Menu as MenuBtn } from "lucide-react"; 
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";

const Menu = ({userName}: {userName: string}) => {
  const pathname = usePathname();

  return (
    <>
    {/* Desktop */}
      <aside className="hidden md:flex fixed  left-0 md:w-50  lg:w-72 bg-white border-r border-slate-200 flex-col justify-between h-full">
        <div className="flex flex-col">
          {/* Logo */}
          <div className="p-6 flex justify-center items-center border-b border-slate-100">
            <Image 
              src="/logo.png" 
              alt='Logo do Consórcio de Desenvolvimento Sustentável da Bacia do Paramirim'
              width={180}
              height={60}
              className="object-contain h-auto w-auto"
              priority
            />
          </div>
          <NavLinks pathname={pathname} paginas={paginas}/>
        </div>

        <UserProfile userName={userName} />
      </aside>

      {/* Mobile */}

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
                
                <NavLinks pathname={pathname} paginas={paginas}/>
                </div>

                <UserProfile userName={userName}/>
            </SheetContent>
            </Sheet>
        </div>

        </header>
      
    </>
  );
};

export default Menu;