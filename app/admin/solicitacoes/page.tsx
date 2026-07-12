import DateCalendarPicker from "@/components/shared/DateCalendarPicker"
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import BasicFilters from "@/components/admin/BasicFilters";
import AddRequest from "@/components/admin/solicitacoes/AddRequest";
import SolicitacaoList from "@/components/admin/solicitacoes/SolicitacaoList";
import {  fuelingRequestsData } from "@/lib/data/fuelingRequests";

const Solicitacoes = () => {
  return (
    <div>
      <HeaderTemplate title='Solicitações' description="Lista de todas as solicitações">
        <DateCalendarPicker />
        <AddRequest />
      </HeaderTemplate>
      <BasicFilters />
      <SolicitacaoList items={ fuelingRequestsData}/>
    </div>
  )
}

export default Solicitacoes
