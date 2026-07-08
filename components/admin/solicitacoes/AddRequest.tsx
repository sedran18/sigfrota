"use client"

import * as React from "react";
import { Plus, Fuel } from "lucide-react";
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
import { camposFiltro } from "@/lib/data/camposFiltro";

const veiculos = camposFiltro[1].campos;
const postos = camposFiltro[0].campos;
const motoristas = camposFiltro[2].campos;

const AddRequest = () => {
  const selectStyles = `
    w-full h-11 px-3 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200 
    rounded-none cursor-pointer uppercase tracking-wider outline-none transition-all
    focus:border-[#093a1c] focus:ring-1 focus:ring-[#093a1c]
  `;

  return (
    <Dialog>
      <DialogTrigger 
        className="
          flex items-center w-full justify-center gap-2 px-4 h-11 
          bg-[#093a1c] text-white text-xs font-bold uppercase tracking-wider 
          rounded-none cursor-pointer shadow-md transition-all duration-150
          hover:bg-[#093a1c]/90
        "
      >
        <Plus size={16} className="shrink-0" />
        <span>Adicionar Solicitação</span>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 text-slate-200 rounded-none p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Fuel size={18} className="text-emerald-400" />
            Adicionar Nova Solicitação
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="carro" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Veículo</Label>
            <select name="carro" id="carro" className={selectStyles} defaultValue="" required>
              <option value="" disabled hidden>Selecione o veículo</option>
              {veiculos.map(v => (
                <option value={v.toLowerCase()} key={v.toLowerCase()} className="bg-slate-950">{v}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="motorista" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Motorista</Label>
            <select name="motorista" id="motorista" className={selectStyles} defaultValue="" required>
              <option value="" disabled hidden>Selecione o motorista</option>
              {motoristas.map(m => (
                <option value={m.toLowerCase()} key={m.toLowerCase()} className="bg-slate-950">{m}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="posto" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Posto de Combustível</Label>
            <select name="posto" id="posto" className={selectStyles} defaultValue="" required>
              <option value="" disabled hidden>Selecione o posto</option>
              {postos.map(p => (
                <option value={p.toLowerCase()} key={p.toLowerCase()} className="bg-slate-950">{p}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="combustivel" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tipo de Combustível</Label>
            <select name="combustivel" id="combustivel" className={selectStyles} defaultValue="" required>
              <option value="" disabled hidden>Selecione o combustível</option>
              <option value='gas' className="bg-slate-950">Gasolina comum</option>
              <option value='etanol' className="bg-slate-950">Etanol</option>
              <option value='gasad' className="bg-slate-950">Gasolina aditivada</option>
              <option value='diesels500' className="bg-slate-950">Diesel S500</option>
              <option value='diesels10' className="bg-slate-950">Diesel S10</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 justify-end">
              <Label htmlFor="km" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quilometragem Inicial (KM)</Label>
              <Input 
                id="km"
                name="km"
                type="number" 
                placeholder="Ex: 145200" 
                className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono focus-visible:ring-[#093a1c]"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 justify-end">
              <label className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-emerald-400 cursor-pointer pb-1 mb-0.5 select-none">
                <input 
                  type="checkbox" 
                  id="encher"
                  name="encher"
                  className="h-5 w-5 accent-[#093a1c] cursor-pointer" 
                />
                Completar tanque
              </label>
              
              <Label htmlFor="litros" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Litros à abastecer</Label>
              <Input 
                id="litros"
                name="litros"
                type="number" 
                step="0.01"
                placeholder="Ex: 45.50"
                required
                className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono focus-visible:ring-[#093a1c] disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-900 pt-4 mt-2">
            <Button 
              type="button" 
              variant="ghost" 
              className="rounded-none cursor-pointer font-bold text-xs tracking-wider uppercase text-slate-400 hover:text-white hover:bg-slate-900"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="cursor-pointer bg-[#093a1c] hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none px-6 h-11"
            >
              Salvar Registro
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRequest;