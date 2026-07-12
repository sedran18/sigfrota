"use client"

import * as React from "react";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddContratoProps {
  postos: { id: string; name: string }[];
}

const AddContrato = ({ postos = [] }: AddContratoProps) => {
  const [open, setOpen] = React.useState(false);


  const inputStyles = `
    h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 
    placeholder:text-slate-600 font-medium focus-visible:ring-[#093a1c]
  `;

  const selectStyles = `
    w-full h-11 px-3 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200 
    rounded-none cursor-pointer uppercase tracking-wider outline-none transition-all
    focus:border-[#093a1c] focus:ring-1 focus:ring-[#093a1c]
  `;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-[#093a1c] flex items-center justify-center cursor-pointer hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none h-11 px-4 gap-2 shadow-md">
            <Plus size={16} />
            Adicionar Contrato
        </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 rounded-none p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            <FileText size={18} className="text-emerald-400" />
            Vincular Novo Contrato
          </DialogTitle>
        </DialogHeader>

        <form  className="flex flex-col gap-4 text-white">
          
          {/* Posto Vinculado */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gas_station_id" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Posto de Combustível *
            </Label>
            <select id="gas_station_id" className={selectStyles} defaultValue="" required>
              <option value="" disabled hidden>Selecione o posto parceiro</option>
              {postos.map(p => (
                <option value={p.id} key={p.id} className="bg-slate-950">{p.name}</option>
              ))}
            </select>
          </div>

          {/* Número do Contrato */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contract_number" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Número do Contrato *
            </Label>
            <Input
              id="contract_number"
              type="number"
              placeholder="EX: 1024"
              className={`${inputStyles} font-mono`}
              required
            />
          </div>

          {/* Grid de Datas (Vigência) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="start_date" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Data de Início *
              </Label>
              <Input
                id="start_date"
                type="date"
                className={`${inputStyles} font-mono uppercase`}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="end_date" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Data de Término *
              </Label>
              <Input
                id="end_date"
                type="date"
                className={`${inputStyles} font-mono uppercase`}
                required
              />
            </div>
          </div>

          {/* Status Inicial Ativo */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="active" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status do Contrato *
            </Label>
            <select id="active" className={selectStyles} defaultValue="true" required>
              <option value="true" className="bg-slate-950">VIGENTE / ATIVO</option>
              <option value="false" className="bg-slate-950">BLOQUEADO / INATIVO</option>
            </select>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-3 border-t border-slate-900 pt-4 mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="rounded-none cursor-pointer font-bold text-xs tracking-wider uppercase hover:text-white hover:bg-slate-900 text-slate-400"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-[#093a1c] hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none px-6 h-11"
            >
              Salvar Contrato
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContrato;