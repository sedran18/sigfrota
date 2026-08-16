import Link from "next/link";
import { 
  Fuel, 
  Car, 
  Users, 
  FileText, 
  LayoutDashboard, 
  ClipboardList, 
  Building2, 
  UserCheck, 
  LucideIcon 
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const iconsMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  solicitacoes: ClipboardList,
  abastecimento: Fuel,
  postos: Building2,
  veiculos: Car,
  contratos: FileText,
  motoristas: Users,
  usuarios: UserCheck,
};

interface PaginaComponentProps {
  iconName: string;
  pagina: string;
  link: string;
  isActive: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

const PaginaComponent = ({ 
  iconName, 
  pagina, 
  link, 
  isActive, 
  setIsOpen }: PaginaComponentProps) => {
  const Icon = iconsMap[iconName] || LayoutDashboard;
  const fullLink = '/admin' + link;

  return (
    <Link 
      href={fullLink}
      onClick={() => setIsOpen?.(false)}
      className={`
        flex items-center gap-3.5 px-5 py-3.5 border-l-4 transition-all duration-150 group select-none
        ${isActive 
          ? 'bg-[#093a1c] border-[#093a1c] text-white font-bold shadow-sm' 
          : 'border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold'
        }
      `}
    >
      <Icon 
        className={`
          w-5 h-5 shrink-0 transition-colors
          ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'}
        `} 
      />
      
      <span className="text-base font-bold tracking-wider uppercase truncate">
        {pagina}
      </span>
    </Link>
  );
};

export default PaginaComponent;