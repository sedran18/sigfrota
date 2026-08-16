import { dateToStringDate } from "@/lib/utils";
import { GetContractsResponseType } from "@/schemas/contract.schema";
import { Calendar, FileText, ShieldCheck, ShieldAlert } from "lucide-react"
import DeleteContratoBtn from "./DeleteContratoBtn";

const ContratoCard = ({ contrato, postoName, isAdmin }: { contrato: GetContractsResponseType, postoName: string, isAdmin: boolean }) => {
  return (
    <div className="relative flex flex-col justify-between gap-4 sm:gap-6 p-4 sm:p-6 bg-white border border-slate-200 transition-all rounded-none hover:border-slate-400 hover:shadow-lg group border-l-4 border-l-[var(--secondary-color)] w-full">
      {isAdmin && (
        <div className="w-full flex justify-end">
          <DeleteContratoBtn contractId={contrato.id} isUsed={contrato.isUsed} active={contrato.active} />
        </div>
      )}
      <div className="flex justify-between items-start gap-2.5 sm:gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
            <FileText size={13} className="shrink-0 text-slate-900 sm:w-3.5 sm:h-3.5" />
            <span>Nº CONTRATO: {contrato.contractNumber}</span>
          </div>
          <h3 className="text-base sm:text-base font-black tracking-wide uppercase mt-0.5 text-slate-900 truncate">
            {postoName.toUpperCase()}
          </h3>
        </div>

        <span className={`flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-black uppercase tracking-wider border shrink-0 ${
          contrato.active 
            ? "bg-emerald-100 border-emerald-300 text-slate-900" 
            : "bg-slate-100 border-slate-300 text-slate-900"
        }`}>
          {contrato.active ? <ShieldCheck size={12} className="sm:w-3.5 sm:h-3.5" /> : <ShieldAlert size={12} className="sm:w-3.5 sm:h-3.5" />}
          {contrato.active ? "VIGENTE" : "ENCERRADO"}
        </span>
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-4 border-t border-b border-slate-200/80 py-3 sm:py-4 text-xs font-bold tracking-wide uppercase text-slate-900">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Calendar size={14} className="shrink-0 text-slate-900 sm:w-4 sm:h-4" />
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] font-sans normal-case font-medium text-slate-900">Início do Contrato</span>
            <span className="text-xs sm:text-base font-black font-mono tracking-tight text-slate-900">
              {dateToStringDate(contrato.startDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Calendar size={14} className="shrink-0 text-slate-900 sm:w-4 sm:h-4" />
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] font-sans normal-case font-medium text-slate-900">Término do Contrato</span>
            <span className="text-xs sm:text-base font-black font-mono tracking-tight text-slate-900">
              {dateToStringDate(contrato.endDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        <p className="text-xs sm:text-base font-bold text-slate-900 uppercase tracking-wide">
          Combustíveis
        </p>

        <div className="grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-2">
          {contrato.contractFuels.map((fuel) => (
            <div
              key={fuel.id}
              className="rounded-none border border-slate-200 bg-white p-3 sm:p-4 shadow-sm"
            >
              <div className="mb-2 sm:mb-3 flex items-center justify-between border-b border-slate-100 pb-1.5 sm:pb-2">
                <h3 className="font-bold text-xs sm:text-base text-slate-900 uppercase">
                  {fuel.fuelType.includes('_') ? fuel.fuelType.replace('_', ' ') : fuel.fuelType}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-900 font-medium">Preço/L</p>
                  <p className="font-bold text-slate-900 font-mono text-xs sm:text-base">
                    R$ {fuel.pricePerLiter.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] sm:text-xs text-slate-900 font-medium">Contratados</p>
                  <p className="font-bold text-slate-900 font-mono text-xs sm:text-base">
                    {fuel.litersContracted} L
                  </p>
                </div>

                <div>
                  <p className="text-[10px] sm:text-xs text-slate-900 font-medium">Disponíveis</p>
                  <p className="font-bold text-slate-900 font-mono text-xs sm:text-base">
                    {fuel.litersAvailable} L
                  </p>
                </div>

                <div>
                  <p className="text-[10px] sm:text-xs text-slate-900 font-medium">Consumidos</p>
                  <p className="font-bold text-slate-900 font-mono text-xs sm:text-base">
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