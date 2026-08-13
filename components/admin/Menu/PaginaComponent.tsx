import { Paginas } from "@/lib/types"
import Link from "next/link";

interface PaginaComponentProps extends Paginas {
  isActive: boolean;
}

const PaginaComponent = ({ icone, pagina, link, isActive }: PaginaComponentProps) => {
  const Icon = icone;
  const fullLink = '/admin' + link;

  return (
    <Link 
      href={fullLink}
      className={`
        flex items-center gap-3 p-3 mx-3 rounded-lg font-medium transition-all duration-200 group
        py-[clamp(6px,2vh,18px)]
        ${isActive 
          ? 'bg-[#093a1c] text-white shadow-md shadow-[#093a1c]/20' 
          : 'text-[var(--bg2)] hover:bg-slate-100 hover:text-slate-900'
        }
      `}
    >
      <div 
        className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-[#093a1c]'}`}
        style={{ fontSize: 'clamp(14px, 2vh, 20px)' }}
      >
        <Icon />
      </div>
      
      <p 
        className="tracking-wide truncate"
        style={{ fontSize: 'clamp(11px, 1.6vh, 14px)' }}
      >
        {pagina}
      </p>
    </Link>
  )
}

export default PaginaComponent;