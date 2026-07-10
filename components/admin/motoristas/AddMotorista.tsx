"use client"

import * as React from "react";
import { Plus, User } from "lucide-react";
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

const AddMotorista = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Motorista cadastrado");
    setOpen(false);
  };

  const inputStyles = `
    h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 
    placeholder:text-slate-600 font-medium focus-visible:ring-[#093a1c]
  `;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-[#093a1c] flex items-center justify-center cursor-pointer hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none h-11 px-4 gap-2 shadow-md">
          <Plus size={16} />
          Adicionar Motorista
        </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 rounded-none p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            <User size={18} className="text-emerald-400" />
            Cadastrar Novo Condutor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
          
          {/* Nome Completo */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="driver_name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Nome Completo *
            </Label>
            <Input
              id="driver_name"
              placeholder="EX: CARLOS ALBERTO SILVA"
              className={`${inputStyles} uppercase`}
              required
            />
          </div>

          {/* Telefone de Contato */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="driver_phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Telefone corporativo / pessoal *
            </Label>
            <Input
              id="driver_phone"
              type="tel"
              placeholder="(00) 00000-0000"
              className={`${inputStyles} font-mono`}
              required
            />
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
              Salvar Condutor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMotorista;