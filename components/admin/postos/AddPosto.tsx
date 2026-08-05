"use client"

import { Edit2, Loader2, Plus } from "lucide-react";
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


const AddPosto = ({gasStation} : {gasStation?: GasStationType}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateGasStationType>({
    resolver: zodResolver(CreateGasStationSchema),
    defaultValues: {
      name: '',
      cnpj: '',
      address: '',
    }
  });

  const {register, formState, handleSubmit, setValue} = form;

  const onSubmit = async (data: CreateGasStationType) => {
    const res = gasStation ? 
      await updateGasStation(gasStation.id, data)
    :
      await createGasStation(data);
    
    if (!res.success && res.error.toLowerCase().includes('cnpj')) 
      return form.setError('cnpj', {type: 'manual', message: res.error});
    if (!res.success) return form.setError('root', {type: 'manual', message: res.error});

    form.reset();
    setOpen(false);
  }

  const inputStyles = `
    h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 
    placeholder: font-medium focus-visible:ring-[#093a1c]
  `;

  useEffect(() => {
    form.reset({...gasStation})
  }, [gasStation, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#093a1c] flex items-center justify-center cursor-pointer hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none h-11 px-4 gap-2 shadow-md">
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
      {
        formState.errors.root && (
          <span>{formState.errors.root.message}</span>
        )
      }
      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 rounded-none p-6 shadow-2xl">
        {
          !gasStation && (
            <DialogHeader className="border-b border-slate-900 pb-4 mb-2 flex flex-row items-center justify-between">
              <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                Cadastrar Novo Posto
              </DialogTitle>
            </DialogHeader>
          )
        }



        <form className="flex flex-col gap-4 text-white" onSubmit={handleSubmit(onSubmit)}>
          
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider">
              Nome do Posto
            </Label>
            <Input
              {...register('name')}
              placeholder="EX: POSTO SANTA MARTA LTDA"
              className={inputStyles}
            />
            {
              formState.errors.name && (
                <span>{formState.errors.name.message}</span>
              )
            }
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cnpj" className="text-[10px] font-bold uppercase tracking-wider">
              CNPJ <span className="">*</span>
            </Label>
            <Input
              {...register('cnpj')}
              id="cnpj"
              maxLength={18}
              onChange={(e) => {
                setValue("cnpj", formatCNPJ(e.target.value));
              }}
              placeholder="00.000.000/0001-00"
              className={`${inputStyles} font-mono`}
            />
            {
              formState.errors.cnpj && (
                <span>{formState.errors.cnpj.message}</span>
              )
            }
          </div>

          
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-wider">
              Endereço Completo <span className="">*</span>
            </Label>
            <textarea
              {...register('address')}
              id="address"
              placeholder="RUA, NÚMERO, BAIRRO, CIDADE - UF"
              className="w-full min-h-[80px] p-3 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-100 rounded-none placeholder: outline-none resize-none transition-all focus:border-[#093a1c] uppercase"
            />
            {
              formState.errors.address && (
                <span>{formState.errors.address.message}</span>
              )
            }
          </div>

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
              disabled={formState.isSubmitting}
              className="cursor-pointer bg-[#093a1c] hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none px-6 h-11"
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

export default AddPosto;