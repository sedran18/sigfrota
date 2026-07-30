import DateCalendarPicker from "@/components/shared/DateCalendarPicker"
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import BasicFilters from "@/components/admin/BasicFilters";
import AddRequest from "@/components/admin/solicitacoes/AddRequest";
import SolicitacaoList from "@/components/admin/solicitacoes/SolicitacaoList";
import { getFuelingRequests } from "@/lib/actions/fuelingRequest";
import { FuelIcon } from "lucide-react";
import { getGasStationsSelect } from "@/lib/actions/gasStation";
import { getDriversSelect } from "@/lib/actions/driver";

const Solicitacoes = async () => {
  const solicitacoes = await getFuelingRequests();
  const postos = await getGasStationsSelect({id:true, name: true});
  // console.log('postos', postos);
  const motoristas = await getDriversSelect({id:true, name: true});
  // console.log('motoristas', motoristas)
  
  return (
    <div>
      <HeaderTemplate title='Solicitações' description="Lista de todas as solicitações">
        <DateCalendarPicker />
        <AddRequest 
          postos={postos.success ? postos.data : []} 
          motoristas={motoristas.success ? motoristas.data : []}
        />
      </HeaderTemplate>
      <BasicFilters />
      {
        solicitacoes.success && solicitacoes.data.length > 0? 
        <SolicitacaoList solicitacoes={solicitacoes.data}/>
        :
        <div className="flex m-2 lg:m-10 flex-col gasStations-center justify-center text-center p-12 bg-slate-50 border border-slate-200 rounded-none">
          <FuelIcon size={32} className="text-slate-400 mb-2.5" />
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nenhuma solicitação de abastecimento</h3>
        </div>     
      }
    </div>
  )
}

export default Solicitacoes
