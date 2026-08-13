import { Paginas } from "@/lib/types";
import PaginaComponent from "./PaginaComponent";

const NavLinks = ({pathname, paginas, isAdmin}: {pathname: string, paginas: Paginas[], isAdmin: boolean}) => (
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
  );

export default NavLinks;