"use client"

import { Edit2, Loader2, Plus, AlertCircle } from "lucide-react";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateGasStationSchema, CreateGasStationType, GasStationType } from "@/schemas/gasStation.schema";
import { formatCNPJ } from "@/lib/utils";
import { createGasStation, updateGasStation } from "@/lib/actions/gasStation";

const AddGasStation = ({ gasStation }: { gasStation?: GasStationType }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateGasStationType>({
    resolver: zodResolver(CreateGasStationSchema),
    defaultValues: {
      name: '',
      cnpj: '',
      address: '',
    }
  });

  const { register, formState, handleSubmit, setValue } = form;

  const onSubmit = async (data: CreateGasStationType) => {
    const res = gasStation ? 
      await updateGasStation(gasStation.id, data)
    :
      await createGasStation(data);
    
    if (!res.success && res.error.toLowerCase().includes('cnpj')) 
      return form.setError('cnpj', { type: 'manual', message: res.error });
    if (!res.success) return form.setError('root', { type: 'manual', message: res.error });

    form.reset();
    setOpen(false);
  }

  const inputStyles = `
    h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 
    font-medium text-base focus-visible:ring-[#093a1c] w-full min-w-0 font-mono
  `;

  useEffect(() => {
    if (gasStation) {
      form.reset({ ...gasStation });
    } else {
      form.reset({ name: '', cnpj: '', address: '' });
    }
  }, [gasStation, form]);

  const fieldError = (message?: string) =>
    message && (
      <span className="flex items-center gap-1.5 text-[11px] font-medium text-rose-400/90 mt-0.5">
        <AlertCircle size={12} className="shrink-0" />
        {message}
      </span>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full sm:w-auto bg-[#093a1c] flex items-center justify-center cursor-pointer hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none h-11 px-4 gap-2 shadow-md">
        {
          gasStation ? 
            <>
              <Edit2 size={16} />
              Editar
            </>
          :
            <>
              <Plus size={16} />
              Adicionar Posto
            </>
        }
      </DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-md bg-slate-950 border border-slate-800 rounded-none p-4 sm:p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2 flex flex-row items-center justify-between">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2 w-[85%]">
            {gasStation ? 'Atualizar' : 'Cadastrar Novo'} Posto
          </DialogTitle>
        </DialogHeader>

        {formState.errors.root && (
          <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-900/60 px-3 py-2 text-xs font-medium text-rose-300 mb-2">
            <AlertCircle size={14} className="shrink-0" />
            {formState.errors.root.message}
          </div>
        )}

        <form className="flex flex-col gap-4 text-white" onSubmit={handleSubmit(onSubmit)}>
          
          <div className="flex flex-col gap-1.5 w-full min-w-0">
            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Nome do Posto
            </Label>
            <Input
              {...register('name')}
              id="name"
              placeholder="EX: POSTO SANTA MARTA LTDA"
              className={inputStyles}
            />
            {fieldError(formState.errors.name?.message)}
          </div>

          <div className="flex flex-col gap-1.5 w-full min-w-0">
            <Label htmlFor="cnpj" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              CNPJ *
            </Label>
            <Input
              {...register('cnpj')}
              id="cnpj"
              maxLength={18}
              onChange={(e) => {
                setValue("cnpj", formatCNPJ(e.target.value));
              }}
              placeholder="00.000.000/0001-00"
              className={`${inputStyles}`}
            />
            {fieldError(formState.errors.cnpj?.message)}
          </div>

          <div className="flex flex-col gap-1.5 w-full min-w-0">
            <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Endereço Completo *
            </Label>
            <textarea
              {...register('address')}
              id="address"
              placeholder="RUA, NÚMERO, BAIRRO, CIDADE - UF"
              className="w-full min-w-0 min-h-[80px] p-3 text-base font-semibold bg-slate-900 border border-slate-800 text-slate-100 rounded-none placeholder:text-slate-600 outline-none resize-none transition-all focus:border-[#093a1c] uppercase"
            />
            {fieldError(formState.errors.address?.message)}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 border-t border-slate-900 pt-4 mt-2">
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
              disabled={formState.isSubmitting}
              className="cursor-pointer bg-[#093a1c] hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none px-6 h-11 flex items-center gap-2"
            >
              {formState.isSubmitting && <Loader2 size={14} className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGasStation;