import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddMotorista from "@/components/admin/motoristas/AddMotorista";
import MotoristasList from "@/components/admin/motoristas/MotoristasList";

export const MOCK_MOTORISTAS = [
  {
    id: "m1-uuid-value",
    name: "Carlos Alberto Albuquerque",
    phone: "(11) 99888-7766",
    created_at: "14/02/2024 07:30:00",
    updated_at: "14/02/2024 07:30:00"
  },
  {
    id: "m2-uuid-value",
    name: "Rodrigo Mendes Souza",
    phone: "(21) 98111-2233",
    created_at: "22/11/2025 10:00:00",
    updated_at: "23/11/2025 08:15:00"
  }
]

const Motoristas = () => {
    return (<>
        <HeaderTemplate title="Contratos">
          <AddMotorista />
        </HeaderTemplate>
        <div className="m-2 lg:m-10">
            <MotoristasList items={MOCK_MOTORISTAS}/>
        </div>
    </>)
}

export default Motoristas;
