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
import {GasStationWithUsageType } from "@/schemas/gasStation.schema";
import { useForm, FormProvider} from "react-hook-form";
import {  CreateContractSchema, CreateContractType } from "@/schemas/contract.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddContractFuel from "./AddContractFuel";
import { createContract } from "@/lib/actions/contract";

const AddContrato = ({ postos = [] }: {postos: GasStationWithUsageType[]}) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<CreateContractType>({
    resolver: zodResolver(CreateContractSchema),
    defaultValues: {
      contractFuels: []
    }
  })
  

  const onSubmit = async (data: CreateContractType) => {
        const res = await createContract(data);
        if (!res.success) return form.setError('root', {type: 'manual', message: res.error});
        alert('Contrato criado com sucesso');
        form.reset();
        setOpen(false);
  }

  const {register, formState, handleSubmit} = form;

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
      <DialogTrigger className='w-full sm:w-auto bg-[#093a1c] flex items-center justify-center cursor-pointer hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none h-11 px-4 gap-2 shadow-md transition-colors'>
          <Plus size={16} />
          Adicionar Contrato
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-none p-4 sm:p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-3 mb-3 sm:pb-4 sm:mb-4">
          <DialogTitle className="text-xs sm:text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            <FileText size={18} className="text-emerald-400 shrink-0" />
            Vincular Novo Contrato
          </DialogTitle>
        </DialogHeader>

        {formState.errors.root && (
          <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs font-medium">
            {formState.errors.root.message}
          </div>
        )}

        <form className="flex flex-col gap-4 text-white" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gas_station_id" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              Posto de Combustível *
            </Label>
            <select
              {...register("gasStationId")}
              id="gas_station_id"
              className={selectStyles}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Selecione o posto parceiro
              </option>
              {postos.map((p) => (
                <option value={p.id} key={p.id} className="bg-slate-950">
                  {p.name}
                </option>
              ))}
            </select>
            {formState.errors.gasStationId && (
              <span className="text-xs text-red-400 font-medium">
                {formState.errors.gasStationId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contract_number" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              Número do Contrato *
            </Label>
            <Input
              {...register("contractNumber")}
              id="contract_number"
              type="number"
              placeholder="EX: 1024"
              className={`${inputStyles} font-mono`}
              
            />
            {formState.errors.contractNumber && (
              <span className="text-xs text-red-400 font-medium">
                {formState.errors.contractNumber.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="start_date" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                Data de Início *
              </Label>
              <Input
                {...register("startDate", { valueAsDate: true })}
                id="start_date"
                type="date"
                className={`${inputStyles} font-mono uppercase`}
                
              />
              {formState.errors.startDate && (
                <span className="text-xs text-red-400 font-medium">
                  {formState.errors.startDate.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="end_date" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                Data de Término *
              </Label>
              <Input
                {...register("endDate", { valueAsDate: true })}
                id="end_date"
                type="date"
                className={`${inputStyles} font-mono uppercase`}
                
              />
              {formState.errors.endDate && (
                <span className="text-xs text-red-400 font-medium">
                  {formState.errors.endDate.message}
                </span>
              )}
            </div>
          </div>

          <FormProvider {...form}>
            <AddContractFuel />
          </FormProvider>
          {formState.errors.contractFuels && (
            <span className="text-xs text-red-400 font-medium">
              {formState.errors.contractFuels.message}
            </span>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 border-t border-slate-900 pt-4 mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto h-11 rounded-none font-bold text-xs tracking-wider uppercase hover:text-white hover:bg-slate-900 text-slate-400"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto h-11 bg-[#093a1c] hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none px-6"
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