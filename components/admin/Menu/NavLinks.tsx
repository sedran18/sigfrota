'use client';

import PaginaComponent from "./PaginaComponent";
import { usePathname } from "next/navigation";
import { paginas } from "@/lib/data/paginas";

const NavLinks = ({ isAdmin }: { isAdmin: boolean }) => {
  const pathname = usePathname();
  return (
    <nav className="flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
      {paginas.map((p) => {
        const isActive = pathname === '/admin' + p.link;
        if (!isAdmin && p.link.endsWith('usuarios')) return null;
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