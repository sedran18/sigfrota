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

  const onError = (err: unknown) => {
    console.log("Erros de validação encontrados:", err);
    alert("Por favor, preencha todos os campos obrigatórios!");
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
            <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
              <Fuel size={16} className="text-emerald-400 sm:w-[18px] sm:h-[18px]" />
              Adicionar Novo Abastecimento
            </DialogTitle>
          </DialogHeader>

          {formState.errors.root && (
            <span className="text-[10px] sm:text-xs text-red-500 font-semibold">
              {formState.errors.root.message}
            </span>
          )}

          <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              
              <div className="flex flex-col gap-1">
                <Label htmlFor="km" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quilometragem final (KM)
                </Label>
                <Input
                  {...register('odometer', { valueAsNumber: true })}
                  id="km"
                  type="number"
                  placeholder="Ex: 145200"
                  className="h-10 sm:h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono text-xs sm:text-base focus-visible:ring-[#093a1c]"
                />
                {formState.errors.odometer && (
                  <span className="text-[10px] sm:text-xs text-red-500">
                    {formState.errors.odometer.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="litros" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Litros Abastecidos
                </Label>
                <Input
                  {...register('liters', { valueAsNumber: true })}
                  id="litros"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 45.50"
                  className="h-10 sm:h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono text-xs sm:text-base focus-visible:ring-[#093a1c]"
                />
                {formState.errors.liters && (
                  <span className="text-[10px] sm:text-xs text-red-500">
                    {formState.errors.liters.message}
                  </span>
                )}
              </div>

            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="obs" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Observações Básicas
              </Label>
              <textarea
                {...register('observations')}
                id="obs"
                placeholder="Digite observações relevantes..."
                className="w-full min-h-[70px] sm:min-h-[80px] p-2.5 sm:p-3 text-xs bg-slate-900 border border-slate-800 text-slate-100 rounded-none placeholder:text-slate-600 outline-none resize-none transition-all focus:border-[#093a1c]"
              />
              {formState.errors.observations && (
                <span className="text-[10px] sm:text-xs text-red-500">
                  {formState.errors.observations.message}
                </span>
              )}
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