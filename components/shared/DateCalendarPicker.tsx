"use client"

import { CalendarDays, X } from 'lucide-react';
import { format, parseISO, subMonths, isBefore, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, MouseEvent } from 'react';

const DateCalendarPicker = () => {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const today = useMemo(() => new Date(), []);

  const dateFromParam = searchParams.get("from");
  const dateToParam = searchParams.get("to");

  const [tempRange, setTempRange] = useState<DateRange | undefined>(undefined);

  const urlRange = useMemo<DateRange | undefined>(() => {
    if (!dateFromParam) return undefined;
    return {
      from: parseISO(dateFromParam),
      to: dateToParam ? parseISO(dateToParam) : undefined,
    };
  }, [dateFromParam, dateToParam]);

  const displayRange = tempRange ?? urlRange;

  // Não confiamos mais no "range" que o react-day-picker calcula.
  // Usamos o dia clicado (2º argumento do onSelect) e montamos a lógica nós mesmos.
  const handleDayClick = (day: Date | undefined) => {
    if (!day) return;

    const current = tempRange;

    // Caso 1: ainda não tem "from", OU já tem um range completo (from + to)
    // => este clique inicia um NOVO range
    if (!current?.from || (current.from && current.to)) {
      setTempRange({ from: day, to: undefined });
      return;
    }

    // Caso 2: já tem "from" e não tem "to" => este é o segundo clique
    if (current.from && !current.to) {
      // clicou na mesma data do "from" de novo: mantém como seleção de 1 dia só
      if (isSameDay(current.from, day)) {
        setTempRange({ from: current.from, to: current.from });
      }

      let from = current.from;
      let to = day;
      if (isBefore(to, from)) {
        [from, to] = [to, from];
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set("from", format(from, "yyyy-MM-dd"));
      params.set("to", format(to, "yyyy-MM-dd"));

      setTempRange(undefined);
      replace(`${pathname}?${params.toString()}`);
      setOpen(false);
    }
  };

  const handleClear = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setTempRange(undefined);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("from");
    params.delete("to");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTempRange(undefined);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger 
        className="
          flex w-full min-w-55 items-center justify-between h-11 px-3
          bg-[#093a1c] border border-transparent text-white 
          text-xs font-bold uppercase tracking-wider text-left 
          rounded-none cursor-pointer transition-all duration-150 select-none
          hover:bg-[#093a1c]/90
        "
      >
        <span className="pr-3">
          {displayRange?.from ? (
            displayRange.to ? (
              <>
                {format(displayRange.from, "dd/MM/yyyy", { locale: ptBR })}
                {" - "}
                {format(displayRange.to, "dd/MM/yyyy", { locale: ptBR })}
              </>
            ) : (
              format(displayRange.from, "dd/MM/yyyy", { locale: ptBR })
            )
          ) : (
            "SELECIONE UM PERÍODO"
          )}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          {displayRange?.from && (
            <X 
              size={14} 
              className="text-white/70 hover:text-white cursor-pointer" 
              onClick={handleClear} 
            />
          )}
          <CalendarDays size={16} className="text-white" />
        </div>
      </PopoverTrigger>

      <PopoverContent 
        className="w-auto p-0 rounded-none border border-slate-300 shadow-md bg-slate-900" 
        align="start"
        sideOffset={4}
      >
        <Calendar
          mode="range"
          selected={displayRange}
          numberOfMonths={2}
          defaultMonth={subMonths(today, 1)}
          captionLayout="dropdown"
          className="rounded-none p-3 bg-white"
          disabled={{ after: today }}
          onSelect={(_range, selectedDay) => handleDayClick(selectedDay)}
          classNames={{
            selected: "bg-[#093a1c] text-white hover:bg-[#093a1c] hover:text-white focus:bg-[#093a1c] focus:text-white rounded-none font-bold",
            month: 'text-white',
            day: "h-9 w-9 p-0 rounded-none hover:bg-slate-700 text-white transition-colors cursor-pointer",
            chevron: 'text-white',
            disabled: "text-slate-300 opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-300",
            today: "border-2 border-[#093a1c] font-bold",
            range_middle: "bg-black text-[#093a1c] rounded-none font-medium",
            range_start: "bg-emerald text-white rounded-none font-bold",
            range_end: "bg-emerald text-white rounded-none font-bold"
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateCalendarPicker;