"use client"

import * as React from "react";
import { Plus, Fuel, AlertCircle } from "lucide-react";
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
import { FuelingRequestIdType } from "@/schemas/fuelingRequest.schema";
import { useForm } from "react-hook-form";
import { CreateFuelingSchema, CreateFuelingType } from "@/schemas/fueling.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFueling } from "@/lib/actions/fueling";

const AddFueling = ({ requestId }: { requestId: FuelingRequestIdType }) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<CreateFuelingType>({
    resolver: zodResolver(CreateFuelingSchema),
    defaultValues: {
      observations: '',
      requestId: requestId,
    }
  });

  const { register, handleSubmit, formState } = form;

  const onSubmit = async (data: CreateFuelingType) => {
    const res = await createFueling(data);
    if (!res.success) return form.setError('root', { type: 'manual', message: res.error });
    alert(res.data);
    form.reset();
    setOpen(false);
  };

  const fieldError = (message?: string) =>
    message && (
      <span className="flex items-center gap-1.5 text-[11px] font-medium text-rose-400 mt-1">
        <AlertCircle size={12} className="shrink-0" />
        {message}
      </span>
    );

  const onError = (err: unknown) => {
    console.log("Erros de validação encontrados:", err);
  };

  return (
    requestId && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full sm:w-auto bg-[#093a1c] cursor-pointer hover:bg-[#093a1c]/90 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase flex items-center justify-center rounded-none h-10 sm:h-11 px-4 gap-2 shadow-md">
          <Plus size={14} className="sm:w-4 sm:h-4" />
          Adicionar Abastecimento
        </DialogTrigger>

        <DialogContent className="w-[95vw] max-w-md bg-slate-950 border border-slate-800 text-slate-200 rounded-none p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b border-slate-900 pb-2 sm:pb-3 mb-1 sm:mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2 w-[85%]">
            <Fuel size={16} className="text-emerald-400 sm:w-[18px] sm:h-[18px]" />
            Adicionar Novo Abastecimento
          </DialogTitle>
          </DialogHeader>

          {formState.errors.root && (
            <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-900/60 px-3 py-2 text-xs font-medium text-rose-300 mb-2">
              <AlertCircle size={14} className="shrink-0" />
              {formState.errors.root.message}
            </div>
          )}

          <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
              
              <div className="flex flex-col gap-1 w-full min-w-0">
                <Label htmlFor="km" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quilometragem final (KM)
                </Label>
                {/* CORREÇÃO: Alterado de text-xs sm:text-base para text-base para evitar zoom no iOS */}
                <Input
                  {...register('odometer', { valueAsNumber: true })}
                  id="km"
                  type="number"
                  placeholder="Ex: 145200"
                  className="h-10 sm:h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono text-base focus-visible:ring-[#093a1c] w-full min-w-0"
                />
                {fieldError(formState.errors.odometer?.message)}
              </div>

              <div className="flex flex-col gap-1 w-full min-w-0">
                <Label htmlFor="litros" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Litros Abastecidos
                </Label>
                {/* CORREÇÃO: Alterado de text-xs sm:text-base para text-base para evitar zoom no iOS */}
                <Input
                  {...register('liters', { valueAsNumber: true })}
                  id="litros"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 45.50"
                  className="h-10 sm:h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono text-base focus-visible:ring-[#093a1c] w-full min-w-0"
                />
                {fieldError(formState.errors.liters?.message)}
              </div>

            </div>

            <div className="flex flex-col gap-1 w-full min-w-0">
              <Label htmlFor="obs" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Observações Básicas
              </Label>
              {/* CORREÇÃO: Alterado de text-xs para text-base para evitar zoom no iOS */}
              <textarea
                {...register('observations')}
                id="obs"
                placeholder="Digite observações relevantes..."
                className="w-full min-w-0 min-h-[70px] sm:min-h-[80px] p-2.5 sm:p-3 text-base bg-slate-900 border border-slate-800 text-slate-100 rounded-none placeholder:text-slate-600 outline-none resize-none transition-all focus:border-[#093a1c]"
              />
              {fieldError(formState.errors.observations?.message)}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 border-t border-slate-900 pt-3 sm:pt-4 mt-1 sm:mt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto h-10 sm:h-11 rounded-none cursor-pointer font-bold text-[10px] sm:text-xs tracking-wider uppercase text-slate-400 hover:text-white hover:bg-slate-900"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto cursor-pointer bg-[#093a1c] hover:bg-[#093a1c]/90 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase rounded-none px-6 h-10 sm:h-11"
              >
                Salvar Registro
              </Button>
            </div>

          </form>
        </DialogContent>
      </Dialog>
    )
  );
};

export default AddFueling;