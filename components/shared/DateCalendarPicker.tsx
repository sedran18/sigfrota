"use client"

import * as React from "react";
import { CalendarDays } from 'lucide-react';
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

const DateCalendarPicker = () =>  {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange | undefined>(undefined)
  const today = React.useMemo(() => new Date(), []);

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[260px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger 
          className="
            flex w-full items-center justify-between h-11 px-3.5
            bg-[#093a1c] border border-transparent text-white 
            text-xs font-bold uppercase tracking-wider text-left 
            rounded-none cursor-pointer transition-all duration-150 select-none
            hover:bg-[#093a1c]/90
          "
        >
          <span className="  pr-2">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: ptBR })}
                  {" - "}
                  {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: ptBR })
              )
            ) : (
              "SELECIONE UM PERÍODO"
            )}
          </span>
          
          <CalendarDays size={16} className="text-white shrink-0" />
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-auto p-0 rounded-none border border-slate-300 
          shadow-md bg-slate-900" 
          align="start"
          sideOffset={4}
        >
          <Calendar
            mode="range"
            selected={date}
            numberOfMonths={2}
            defaultMonth={subMonths(today, 1)}
            captionLayout="dropdown"
            className="rounded-none p-3 bg-white"
            
            disabled={{ after: today }}

            onSelect={(selectedDate) => {
              setDate(selectedDate);
            }}
            
            classNames={{
                selected: "bg-[#093a1c] text-white hover:bg-[#093a1c] hover:text-white focus:bg-[#093a1c] focus:text-white rounded-none font-bold",
                month: 'text-white',
                day: "h-9 w-9 p-0  rounded-none  hover:bg-slate-700 text-white transition-colors cursor-pointer  ",
                chevron: 'text-white',
                disabled: "text-slate-300 opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-300",
                today: "border-2 border-[#093a1c] font-bold ",
                range_middle: "bg-black text-[#093a1c]  rounded-none font-medium",
                range_start: "bg-emerald text-white rounded-none font-bold",
                range_end: "bg-emerald text-white rounded-none font-bold"
            }}
            
            />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateCalendarPicker;