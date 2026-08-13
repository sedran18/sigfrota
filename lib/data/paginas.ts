export interface PaginaItem {
  iconName: string;
  pagina: string;
  link: string;
}

export const paginas: PaginaItem[] = [
  {
    iconName: 'dashboard',
    pagina: 'Dashboard',
    link: ''
  }, 
  {
    iconName: 'solicitacoes',
    pagina: 'Solicitações',
    link: '/solicitacoes'
  },
  {
    iconName: 'abastecimento',
    pagina: 'Abastecimentos',
    link: '/abastecimentos'
  }, 
  {
    iconName: 'postos',
    pagina: 'Postos',
    link: '/postos'
  },
  {
    iconName: 'veiculos',
    pagina: 'Veículos',
    link: '/veiculos'
  },
  {
    iconName: 'contratos',
    pagina: 'Contratos',
    link: '/contratos'
  },
  {
    iconName: 'motoristas',
    pagina: 'Motoristas',
    link: '/motoristas'
  },
  {
    iconName: 'usuarios',
    pagina: 'Usuários',
    link: '/usuarios'
  }
];