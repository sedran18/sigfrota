import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddPosto from "@/components/admin/postos/AddPosto";
import { PostoData } from "@/components/admin/postos/PostosList/PostoCard";
import PostosList from "@/components/admin/postos/PostosList";

export const MOCK_POSTOS: PostoData[] = [
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    name: "Posto Santos",
    cnpj: "12.345.678/0001-99",
    phone: "(11) 98765-4321",
    address: 'Dom Basílio',
    created_at: "09/07/2026 10:00:00",
    updated_at: "09/07/2026 10:00:00"
  },
  {
    id: "f6e5d4c3-b2a1-0f9e-8d7c-6b5a4f3e2d1c",
    name: "Posto Santa Marta",
    cnpj: "98.765.432/0001-88",
    phone: "(21) 2555-0199",
    address: 'Paramirim',
    created_at: "08/07/2026 14:30:00",
    updated_at: "08/07/2026 15:00:00"
  },
  {
    id: "1a3b5c7d-2e4f-6g8h-0i9j-1k2l3m4n5o6p",
    name: "Posto Plínio",
    cnpj: "55.111.222/0001-33",
    phone: "(51) 3333-4444",
    address: 'Ibipitanga',
    created_at: "05/07/2026 09:15:22",
    updated_at: "05/07/2026 09:15:22"
  }
]
const Postos = () => {
    return (<>
        <HeaderTemplate title="Postos">
            <AddPosto />
        </HeaderTemplate>
        <div className="m-2 lg:m-10">
            <PostosList items={MOCK_POSTOS}  />
        </div>  

    </>)
}

export default Postos;
