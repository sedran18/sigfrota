import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddVeiculo from "@/components/admin/veiculos/AddVeiculo";
import VeiculosList from "@/components/admin/veiculos/VeiculosList";
import { vehiclesData } from "@/lib/data/vehicles";

const Veiculos = () => {
    return (<>
        <HeaderTemplate title="Veículos">
          <AddVeiculo />
        </HeaderTemplate>
        <VeiculosList items={vehiclesData}/>
    </>)
}

export default Veiculos;
