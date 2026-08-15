'use client';

import PaginaComponent from "./PaginaComponent";
import { usePathname } from "next/navigation";
import { paginas } from "@/lib/data/paginas";
import { Dispatch, SetStateAction } from "react";

const NavLinks = ({ isAdmin, setIsOpen }: { isAdmin: boolean, setIsOpen?: Dispatch<SetStateAction<boolean>> }) => {
  const pathname = usePathname();

  return (
    <nav className="flex-1 min-h-0 flex flex-col justify-start py-3 px-1 gap-1 overflow-y-auto">
      {paginas.map((p) => {
        const isActive = pathname === '/admin' + p.link;
        if (!isAdmin && p.link.endsWith('usuarios')) return null;
        return (
          <PaginaComponent
            setIsOpen={setIsOpen}
            iconName={p.iconName}
            pagina={p.pagina}
            link={p.link}
            isActive={isActive}
            key={p.pagina}
          />
        );
      })}
    </nav>
  );
};

export default NavLinks;