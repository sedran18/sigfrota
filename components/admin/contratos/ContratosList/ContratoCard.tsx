import { dateToStringDate } from "@/lib/utils";
import {  GetContractsResponseType } from "@/schemas/contract.schema";
import { Calendar, FileText, ShieldCheck, ShieldAlert } from "lucide-react"



const ContratoCard = ({ contrato, postoName }: {contrato: GetContractsResponseType, postoName: string}) => {
  return (
    <div className="relative flex flex-col justify-between gap-6 p-6 bg-white  
     border border-slate-200 transition-all rounded-none hover:border-slate-400 hover:shadow-lg group border-l-4 border-l-[var(--secondary-color)]">
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold  uppercase tracking-wider">
            <FileText size={14} className="shrink-0" />
            <span>Nº CONTRATO: {contrato.contractNumber}</span>
          </div>
          <h3 className="text-base font-black  tracking-wide uppercase   mt-0.5">
            {postoName.toUpperCase()}
          </h3>
        </div>
        
        <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider border shrink-0 ${
          contrato.active 
            ? "bg-emerald-100 border-emerald-300 text-emerald-900" 
            : "bg-slate-100 border-slate-300 "
        }`}>
          {contrato.active ? <ShieldCheck size={13} /> : <ShieldAlert size={13} />}
          {contrato.active ? "VIGENTE" : "ENCERRADO"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-slate-200/80 py-4 text-xs font-bold tracking-wide uppercase ">
        <div className="flex items-center gap-3">
          <Calendar size={16} className=" shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px]  font-sans normal-case font-medium">contrato de Início</span>
            <span className="text-sm font-black  font-mono tracking-tight">
              {dateToStringDate(contrato.startDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar size={16} className=" shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px]  font-sans normal-case font-medium">contrato de Término</span>
            <span className="text-sm font-black  font-mono tracking-tight">
              {dateToStringDate(contrato.endDate)}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">
          Combustíveis
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {contrato.contractFuels.map((fuel) => (
            <div
              key={fuel.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {fuel.fuelType}
                </h3>

              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Preço por litro</p>
                  <p className="font-medium text-gray-900">
                    R$ {fuel.pricePerLiter.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Contratados</p>
                  <p className="font-medium text-gray-900">
                    {fuel.litersContracted} L
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Disponíveis</p>
                  <p className="font-medium text-green-600">
                    {fuel.litersAvailable} L
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Consumidos</p>
                  <p className="font-medium text-gray-900">
                    {fuel.litersConsumed} L
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
  </div>
    </div>
  )
}

export default ContratoCard;