"use client"

import * as React from "react";
import { Plus } from "lucide-react";
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


const AddPosto = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Posto cadastrado");
    setOpen(false);
  };

  const inputStyles = `
    h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 
    placeholder: font-medium focus-visible:ring-[#093a1c]
  `;

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger className="bg-[#093a1c] flex items-center justify-center cursor-pointer hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none h-11 px-4 gap-2 shadow-md">
          <Plus size={16} />
          Adicionar Posto
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 rounded-none p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2 flex flex-row items-center justify-between">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            Cadastrar Novo Posto
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
          
          {/* Nome do Posto */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider">
              Nome do Posto
            </Label>
            <Input
              id="name"
              placeholder="EX: POSTO SANTA MARTA LTDA"
              className={inputStyles}
              required
            />
          </div>

          {/* CNPJ */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cnpj" className="text-[10px] font-bold uppercase tracking-wider">
              CNPJ <span className="">*</span>
            </Label>
            <Input
              id="cnpj"
              placeholder="00.000.000/0001-00"
              className={`${inputStyles} font-mono`}
              required
            />
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider">
              Telefone <span className=" font-normal italic">(Opcional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              className={`${inputStyles} font-mono`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-wider">
              Endereço Completo <span className="">*</span>
            </Label>
            <textarea
              id="address"
              placeholder="RUA, NÚMERO, BAIRRO, CIDADE - UF"
              required
              className="w-full min-h-[80px] p-3 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-100 rounded-none placeholder: outline-none resize-none transition-all focus:border-[#093a1c] uppercase"
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-3 border-t border-slate-900 pt-4 mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="rounded-none cursor-pointer font-bold text-xs tracking-wider uppercase hover:text-white hover:bg-slate-900"
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

export default AddPosto;