'use client';

import PaginaComponent from "./PaginaComponent";
import { usePathname } from "next/navigation";
import { paginas } from "@/lib/data/paginas";

const NavLinks = ({isAdmin}: {isAdmin: boolean}) => {
  const pathname = usePathname();
  return (
    <nav className="mt-6 flex flex-col gap-0.5">
      {paginas.map((p) => {
        const isActive = pathname === '/admin' + p.link;
        if (!isAdmin && p.link.endsWith('usuarios')) return;
        return (
          <PaginaComponent 
            icone={p.icone} 
            pagina={p.pagina} 
            link={p.link} 
            isActive={isActive}
            key={p.pagina}
          />
        );
      })}
    </nav>
  )
};

export default NavLinks;