import {GetContractsResponseType } from "@/schemas/contract.schema";
import ContratoCard from "./ContratoCard"
import { GasStationType } from "@/schemas/gasStation.schema";


const ContratosList = ({ contratos, postos }: {
  contratos: GetContractsResponseType[],
  postos: GasStationType[]
}) => {

  return (
    <div className="grid p-1 md:p-2 lg:p-10 px-auto grid-cols-1 gap-4 w-full overflow-hidden">
      {contratos.map((contrato) => {
        const posto = postos?.find(p => p.id === contrato.gasStationId);

        return (<ContratoCard key={contrato.id} contrato={contrato} postoName={posto?.name ?? 'Não encontrado!'}/>);
    }
    )}
    </div>
  )
}

export default ContratosList;