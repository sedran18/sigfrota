import { House, RefreshCcw, Fuel, CarFront, FileText, Users} from 'lucide-react';
import { type Paginas } from '../types';

export const paginas: Paginas[]  = [
  {
    icone: House,
    pagina: 'Dashboard',
    link: ''
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
  }
]