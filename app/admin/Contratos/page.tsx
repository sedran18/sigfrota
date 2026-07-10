import AddContrato from "@/components/admin/contratos/AddContrato";
import ContratosList from "@/components/admin/contratos/ContratosList";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import { MOCK_POSTOS } from "../postos/page";

export const MOCK_CONTRATOS = [
  {
    id: "c1-uuid-value",
    gas_station_id: "posto-santos-id-123",
    contract_number: 1044,
    start_date: "01/01/2026 00:00:00",
    end_date: "31/12/2026 23:59:59",
    active: true,
    created_at: "01/01/2026 09:00:00",
    updated_at: "01/01/2026 09:00:00"
  },
  {
    id: "c2-uuid-value",
    gas_station_id: "posto-plinio-id-456",
    contract_number: 992,
    start_date: "01/06/2025 00:00:00",
    end_date: "01/06/2026 23:59:59",
    active: false,
    created_at: "28/05/2025 14:20:00",
    updated_at: "02/06/2026 10:15:00"
  }
]

const Contratos = () => {
    return (<>
        <HeaderTemplate title="Contratos">
          <AddContrato postos={MOCK_POSTOS}/>
        </HeaderTemplate>
        <div className="m-2 lg:m-10">
            <ContratosList items={MOCK_CONTRATOS}/>
        </div>
    </>)
}

export default Contratos;
