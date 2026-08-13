import { House, RefreshCcw, Fuel, CarFront, FileText, Users, ClipboardList, User} from 'lucide-react';
import { type Paginas } from '../types';

export const paginas: Paginas[]  = [
  {
    icone: House,
    pagina: 'Dashboard',
    link: ''
  }, 
  {
    icone: ClipboardList,
    pagina: 'Solicitações',
    link: '/solicitacoes'
  },
  {
    icone: RefreshCcw,
    pagina: 'Abastecimentos',
    link: '/abastecimentos'
  }, 
  {
    icone: Fuel,
    pagina: 'Postos',
    link: '/postos'
  },
  {
    icone: CarFront ,
    pagina: 'Veículos',
    link: '/veiculos'
  },
  {
    icone: FileText,
    pagina: 'Contratos',
    link: '/contratos'
  },
  {
    icone: Users,
    pagina: 'Motoristas',
    link: '/motoristas'
  },
  {
    icone: User,
    pagina: 'Usuários',
    link: '/usuarios'
  }
]