import {GetContractsResponseType } from "@/schemas/contract.schema";
import ContratoCard from "./ContratoCard"
import { GasStationType } from "@/schemas/gasStation.schema";


const ContratosList = ({ contratos, postos, isAdmin}: {
  contratos: GetContractsResponseType[],
  postos: GasStationType[],
  isAdmin: boolean
}) => {

  return (
    <div className="grid p-2  lg:p-10 px-auto grid-cols-1 gap-4 w-full overflow-hidden">
      {contratos.map((contrato) => {
        const posto = postos?.find(p => p.id === contrato.gasStationId);

        return (<ContratoCard key={contrato.id} contrato={contrato} postoName={posto?.name ?? 'Não encontrado!'} isAdmin={isAdmin}/>);
    }
    )}
    </div>
  )
}

export default ContratosList;