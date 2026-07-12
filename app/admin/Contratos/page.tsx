import AddContrato from "@/components/admin/contratos/AddContrato";
import ContratosList from "@/components/admin/contratos/ContratosList";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import { contractsData } from "@/lib/data/contracts";
import { gasStationsData } from "@/lib/data/gasStations";

const Contratos = () => {
    const postos = gasStationsData.map(p => ({id: p.id, name: p.name}));

    return (<>
        <HeaderTemplate title="Contratos">
          <AddContrato postos={postos}/>
        </HeaderTemplate>
        <ContratosList items={contractsData}/>
    </>)
}

export default Contratos;
