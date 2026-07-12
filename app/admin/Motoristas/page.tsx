import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddMotorista from "@/components/admin/motoristas/AddMotorista";
import MotoristasList from "@/components/admin/motoristas/MotoristasList";
import { DriversData } from "@/lib/data/drivers";



const Motoristas = () => {
    return (<>
        <HeaderTemplate title="Contratos">
          <AddMotorista />
        </HeaderTemplate>
        <MotoristasList items={DriversData}/>
    </>)
}

export default Motoristas;
