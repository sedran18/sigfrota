import { dateToStringDate } from "@/lib/utils";
import { DriverWithUsageType } from "@/schemas/driver.schema";
import { Phone, Calendar } from "lucide-react";
import AddDriver from "../AddDriver";
import DeleteDriverBtn from "./DeleteDriverBtn";

const MotoristaCard = ({
  driver,
  isAdmin,
}: {
  driver: DriverWithUsageType;
  isAdmin: boolean;
}) => {
  return (
    <div className="relative flex flex-col justify-between gap-5 p-5 sm:p-6 bg-white border border-slate-200 transition-all duration-300 hover:border-slate-300 hover:shadow-lg group border-l-4 border-l-[var(--secondary-color)]">
      <div className="flex justify-between items-start gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            <Calendar size={13} className="shrink-0" />
            <span>Admissão: {dateToStringDate(driver.createdAt)}</span>
          </div>
          <h3 className="text-base font-black tracking-tight text-slate-900 uppercase mt-0.5 truncate">
            {driver.name}
          </h3>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 shrink-0">
            <DeleteDriverBtn
              driverId={driver.id}
              isUsed={driver.isUsed}
              active={driver.active}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3.5 border-t border-b border-slate-100 py-4 text-[11px] font-bold tracking-wide uppercase">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-slate-50 text-slate-500 rounded-md shrink-0">
            <Phone size={14} className="shrink-0" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] text-slate-900 font-sans normal-case font-medium">
              Contato Direto
            </span>
            <span className="text-base font-black text-slate-900 font-mono tracking-tight truncate">
              {driver.phone || "NÃO INFORMADO"}
            </span>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="flex items-center justify-end pt-1">
          <AddDriver driver={driver} />
        </div>
      )}
    </div>
  );
};

export default MotoristaCard;