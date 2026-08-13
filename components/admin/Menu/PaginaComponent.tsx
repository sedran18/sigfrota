import Link from "next/link";
import { Fuel, Car, Users, FileText, LayoutDashboard, LucideIcon } from "lucide-react";

const iconsMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  veiculos: Car,
  motoristas: Users,
  contratos: FileText,
  abastecimento: Fuel,
};

interface PaginaComponentProps {
  iconName: string;
  pagina: string;
  link: string;
  isActive: boolean;
}

const PaginaComponent = ({ iconName, pagina, link, isActive }: PaginaComponentProps) => {
  const Icon = iconsMap[iconName] || LayoutDashboard;
  const fullLink = '/admin' + link;

  return (
    <Link 
      href={fullLink}
      className={`
        flex items-center gap-3 px-4 py-3 border-l-4 transition-colors group
        ${isActive 
          ? 'bg-[#093a1c]/10 border-[#093a1c] text-[#093a1c] font-bold' 
          : 'border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
        }
      `}
    >
      <Icon 
        className={`
          w-4 h-4 shrink-0 transition-colors
          ${isActive ? 'text-[#093a1c]' : 'text-slate-500 group-hover:text-slate-800'}
        `} 
      />
      
      <span className="text-xs tracking-wider uppercase truncate">
        {pagina}
      </span>
    </Link>
  )
}

export default PaginaComponent;