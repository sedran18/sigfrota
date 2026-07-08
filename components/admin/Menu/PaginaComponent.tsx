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
        flex items-center gap-3 px-4 py-3.5 mx-3 my-1 rounded-lg font-medium transition-all duration-200 group
        ${isActive 
          ? 'bg-[#093a1c] text-white shadow-md shadow-[#093a1c]/20' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }
      `}
    >
      <div className={`text-xl transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-[#093a1c]'}`}>
        <Icon />
      </div>
      
      <p className="text-sm tracking-wide">{pagina}</p>
    </Link>
  )
}

export default PaginaComponent;