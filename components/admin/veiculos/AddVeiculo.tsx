"use client"

import * as React from "react";
import { Plus, Car } from "lucide-react";
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

const AddVeiculo = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Veículo cadastrado");
    setOpen(false);
  };

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
            Adicionar Veículo
        </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-slate-950 border border-slate-800 rounded-none p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Car size={18} className="text-emerald-400" />
            Integrar Veículo à Frota
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
          
          {/* Grid Identificação: Placa, Marca e Modelo */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="plate" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Placa *</Label>
              <Input id="plate" placeholder="ABC1D23" className={`${inputStyles} font-mono uppercase`} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="brand" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Marca *</Label>
              <Input id="brand" placeholder="EX: FIAT" className={`${inputStyles} uppercase`} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Modelo *</Label>
              <Input id="model" placeholder="EX: STRADA" className={`${inputStyles} uppercase`} required />
            </div>
          </div>

          {/* Grid Técnico: Ano, Combustível e Capacidade do Tanque */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="year" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ano *</Label>
              <Input id="year" type="number" placeholder="2024" className={`${inputStyles} font-mono`} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fuel_type" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Combustível *</Label>
              <select id="fuel_type" className={selectStyles} defaultValue="" required>
                <option value="" disabled hidden>SELECIONE</option>
                <option value="GASOLINA" className="bg-slate-950">GASOLINA</option>
                <option value="ETANOL" className="bg-slate-950">ETANOL</option>
                <option value="DIESEL COMUM" className="bg-slate-950">DIESEL COMUM</option>
                <option value="DIESEL S10" className="bg-slate-950">DIESEL S10</option>
                <option value="FLEX" className="bg-slate-950">FLEX</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tank_capacity" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tanque (L) *</Label>
              <Input id="tank_capacity" type="number" step="0.1" placeholder="55" className={`${inputStyles} font-mono`} required />
            </div>
          </div>

          {/* Grid Operacional: Odômetro, Nível de Combustível e Média Esperada */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current_odometer" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">KM Inicial *</Label>
              <Input id="current_odometer" type="number" placeholder="0" className={`${inputStyles} font-mono`} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current_fuel_level" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nível Litros *</Label>
              <Input id="current_fuel_level" type="number" step="0.1" placeholder="10" className={`${inputStyles} font-mono`} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="average_consumption_km_l" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Média (KM/L) *</Label>
              <Input id="average_consumption_km_l" type="number" step="0.01" placeholder="10.5" className={`${inputStyles} font-mono`} required />
            </div>
          </div>

          {/* Status de Conservação */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="conservation_status" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status Operacional *</Label>
            <select id="conservation_status" className={selectStyles} defaultValue="GOOD" required>
              <option value="GOOD" className="bg-slate-950">OPERANTE / BOM ESTADO</option>
              <option value="UNDER_MAINTENANCE" className="bg-slate-950">EM MANUTENÇÃO PREVENTIVA/CORRETIVA</option>
              <option value="DEFFECTED" className="bg-slate-950">INOPERANTE / AVARIADO</option>
            </select>
          </div>

          {/* Observações */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="observation" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Observações <span className="text-slate-600 font-normal italic">(Opcional)</span></Label>
            <textarea
              id="observation"
              placeholder="Detalhes adicionais sobre restrições de uso ou sinistros..."
              className="w-full min-h-[70px] p-3 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-100 rounded-none placeholder:text-slate-600 outline-none resize-none transition-all focus:border-[#093a1c] uppercase"
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-3 border-t border-slate-900 pt-4 mt-1">
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
              Salvar Veículo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVeiculo;