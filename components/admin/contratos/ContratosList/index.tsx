import {GetContractsResponseType } from "@/schemas/contract.schema";
import ContratoCard from "./ContratoCard"
import { GasStationType } from "@/schemas/gasStation.schema";


const ContratosList = ({ contratos, postos }: {
  contratos: GetContractsResponseType[],
  postos: GasStationType[]
}) => {

  return (
    <div className="grid  grid-cols-1 m-2 lg:m-10 gap-4 w-full m-2 lg:m-10">
      {contratos.map((contrato) => {
        const posto = postos?.find(p => p.id === contrato.gasStationId);

        return (<ContratoCard key={contrato.id} contrato={contrato} postoName={posto?.name ?? 'Não encontrado!'}/>);
    }
    )}
    </div>
  )
}

export default ContratosList;