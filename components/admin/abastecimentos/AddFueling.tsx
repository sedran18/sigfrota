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
import { FuelingRequestIdType} from "@/schemas/fuelingRequest.schema";
import { useForm } from "react-hook-form";
import { CreateFuelingSchema, CreateFuelingType } from "@/schemas/fueling.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFueling } from "@/lib/actions/fueling";

const AddFueling = ({requestId}: {requestId: FuelingRequestIdType}) => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<CreateFuelingType>({
    resolver: zodResolver(CreateFuelingSchema),
    defaultValues: {
      observations: '',
      requestId: requestId,
    }
  });

  const {register, handleSubmit, formState} = form;

  const onSubmit = async (data: CreateFuelingType) => {
    

  const res = await createFueling(data);
    if (!res.success) return form.setError('root', {type: 'manual', message: res.error});
    alert(res.data)
    form.reset();
    setOpen(false);
  }

    const onError = (err: unknown) => {
      console.log("Erros de validação encontrados:", err);
      alert("Por favor, preencha todos os campos obrigatórios!");
    };

  return requestId && (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#093a1c] cursor-pointer hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center rounded-none h-11 px-4 gap-2 shadow-md">
          <Plus size={16} />
          Adicionar Abastecimento                
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 text-slate-200 rounded-none p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Fuel size={18} className="text-emerald-400" />
            Adicionar Novo Abastecimento
          </DialogTitle>
        </DialogHeader>
        {
          formState.errors.root && (
            <span>{formState.errors.root.message}</span>
          )
        }
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="km" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quilometragem final (KM)</Label>
              <Input 
                {...register('odometer', {valueAsNumber: true})}
                id="km"
                type="number" 
                placeholder="Ex: 145200" 
                className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono focus-visible:ring-[#093a1c]"
              />
              {
                formState.errors.odometer && (
                  <span>{formState.errors.odometer.message}</span>
                )
              }
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="litros" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Litros Abastecidos</Label>
              <Input 
                {...register('liters', {valueAsNumber: true})}
                id="litros"
                type="number" 
                step="0.01"
                placeholder="Ex: 45.50"
                className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono focus-visible:ring-[#093a1c]"
              />
              {
                formState.errors.liters && (
                  <span>{formState.errors.liters.message}</span>
                )
              }
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="obs" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Observações Básicas</Label>
            <textarea 
              {...register('observations')}
              id="obs" 
              placeholder="Digite observações relevantes..."
              className="w-full min-h-[80px] p-3 text-xs bg-slate-900 border border-slate-800 text-slate-100 rounded-none placeholder:text-slate-600 outline-none resize-none transition-all focus:border-[#093a1c]"
            />
              {
                formState.errors.observations && (
                  <span>{formState.errors.observations.message}</span>
                )
              }
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-900 pt-4 mt-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
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

export default AddFueling;