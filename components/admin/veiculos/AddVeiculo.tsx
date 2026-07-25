"use client"

import { Plus, Car, Edit2, Loader2 } from "lucide-react";
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
import { CreateVehicleSchema, CreateVehicleType, VehicleWithUsageType } from "@/schemas/vehicle.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVehicle, updateVehicle } from "@/lib/actions/vehicle";

const AddVeiculo = ({ vehicle }: { vehicle?: VehicleWithUsageType }) => {

  
  
  const [open, setOpen] = useState(false);
  const form = useForm<CreateVehicleType>({
    resolver: zodResolver(CreateVehicleSchema),
    defaultValues: {
      plate: vehicle?.plate ?? '',
      model: vehicle?.model ?? '',
      brand: vehicle?.brand ?? '',
      year: vehicle?.year ?? 2024,
      fuelType: vehicle?.fuelType ?? 'GASOLINA',
      tankCapacity: vehicle?.tankCapacity,
      currentOdometer: vehicle?.currentOdometer,
      averageConsumption: vehicle?.averageConsumption,
      conservationStatus: vehicle?.conservationStatus ?? 'GOOD',
      observation: vehicle?.observation,
    }

  });

  const {register, formState, handleSubmit} = form;

  const onSubmit = async (data: CreateVehicleType) => {
    const res = vehicle ? 
      await updateVehicle(vehicle.id, data)
    :
      await createVehicle(data);
    
    if (!res.success) return form.setError('root', {type: 'manual', message: res.error});

    form.reset();
    setOpen(false);
  }

  useEffect(() => {
    form.reset({...vehicle})
  }, [vehicle, form]);

  const inputStyles = `
    h-11 w-full rounded-none bg-slate-900 border border-slate-700 text-slate-100 
    placeholder:text-slate-500 font-medium text-sm
    focus:border-[#0f5c2c] focus:ring-1 focus:ring-[#0f5c2c] 
    hover:border-slate-600 transition-all duration-200
  `;

  const selectStyles = `
    h-11 w-full px-3 text-sm font-semibold bg-slate-900 border border-slate-700 text-slate-100 
    rounded-none cursor-pointer uppercase tracking-wider
    focus:border-[#0f5c2c] focus:ring-1 focus:ring-[#0f5c2c]
    hover:border-slate-600 transition-all duration-200
  `;

  const labelStyles = "text-[10px] font-bold uppercase tracking-[0.5px] text-slate-400";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#093a1c] hover:bg-[#0f5c2c] active:bg-[#093a1c] flex items-center justify-center cursor-pointer text-white font-bold text-xs tracking-wider uppercase rounded-none h-11 px-5 gap-2 shadow-md hover:shadow-lg hover:shadow-[#093a1c]/30 transition-all duration-200">
        {vehicle ? (
          <>
            <Edit2 size={16} />
            Atualizar Veículo
          </>
        ) : (
          <>
            <Plus size={16} />
            Adicionar Veículo
          </>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-2xl bg-slate-950 border border-slate-800 rounded-none p-5 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden ">
        
        <DialogHeader className="border-b border-slate-800 pb-5 mb-6 relative">
          <span className="absolute -left-6 sm:-left-8 top-0 bottom-6 w-1 bg-gradient-to-b from-[#093a1c] to-transparent" />
          <DialogTitle className="text-base sm:text-lg font-black uppercase tracking-widest text-white flex items-center gap-3">
            <Car size={20} className="text-emerald-400" />
            {vehicle ? 'Atualizar Veículo' : 'Integrar Veículo à Frota'}
          </DialogTitle>
        </DialogHeader>

        {
          formState.errors.root && (
            <span>{formState.errors.root.message}</span>
          )
        }
        <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Linha 1 - Placa, Marca, Modelo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="plate" className={labelStyles}>Placa *</Label>
              <Input 
                {...register('plate', { setValueAs: (v: string) => v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() })}
                id="plate"
                maxLength={7}
                placeholder="ABC1D23" 
                className={`${inputStyles} uppercase tracking-widest`} 
              />
              {formState.errors.plate && <span className="text-rose-400 text-xs mt-1">{formState.errors.plate.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="brand" className={labelStyles}>Marca *</Label>
              <Input 
                {...register('brand')}
                id="brand" 
                placeholder="EX: FIAT" 
                className={`${inputStyles} uppercase`} 
              />
              {formState.errors.brand && <span className="text-rose-400 text-xs mt-1">{formState.errors.brand.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model" className={labelStyles}>Modelo *</Label>
              <Input 
                {...register('model')}
                id="model" 
                placeholder="EX: STRADA" 
                className={`${inputStyles} uppercase`} 
              />
              {formState.errors.model && <span className="text-rose-400 text-xs mt-1">{formState.errors.model.message}</span>}
            </div>
          </div>

          {/* Linha 2 - Ano, Combustível, Tanque */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="year" className={labelStyles}>Ano *</Label>
              <Input 
                {...register('year', { valueAsNumber: true })}
                id="year" 
                type="number" 
                placeholder="2024" 
                className={inputStyles}
              />
              {formState.errors.year && <span className="text-rose-400 text-xs mt-1">{formState.errors.year.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fuel_type" className={labelStyles}>Combustível *</Label>
              <select {...register('fuelType')} id="fuel_type" className={selectStyles}>
                <option value="GASOLINA">GASOLINA</option>
                <option value="ETANOL">ETANOL</option>
                <option value="DIESEL_COMUM">DIESEL COMUM</option>
                <option value="DIESEL_S10">DIESEL S10</option>
                <option value="FLEX">FLEX</option>
              </select>
              {formState.errors.fuelType && <span className="text-rose-400 text-xs mt-1">{formState.errors.fuelType.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tank_capacity" className={labelStyles}>Tanque (L) *</Label>
              <Input 
                {...register('tankCapacity', { valueAsNumber: true })}
                id="tank_capacity" 
                type="number" 
                step="0.1" 
                placeholder="55" 
                className={inputStyles} 
              />
              {formState.errors.tankCapacity && <span className="text-rose-400 text-xs mt-1">{formState.errors.tankCapacity.message}</span>}
            </div>
          </div>

          {/* Linha 3 - KM e Média */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current_odometer" className={labelStyles}>KM Inicial *</Label>
              <Input 
                {...register('currentOdometer', { valueAsNumber: true })}
                id="current_odometer" 
                type="number" 
                placeholder="0" 
                className={inputStyles} 
              />
              {formState.errors.currentOdometer && <span className="text-rose-400 text-xs mt-1">{formState.errors.currentOdometer.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="average_consumption_km_l" className={labelStyles}>Média (KM/L) *</Label>
              <Input 
                {...register('averageConsumption', { valueAsNumber: true })}
                id="average_consumption_km_l" 
                type="number" 
                step="0.01" 
                placeholder="10.5" 
                className={inputStyles} 
              />
              {formState.errors.averageConsumption && <span className="text-rose-400 text-xs mt-1">{formState.errors.averageConsumption.message}</span>}
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="conservation_status" className={labelStyles}>Status Operacional *</Label>
            <select {...register('conservationStatus')} id="conservation_status" className={selectStyles}>
              <option value="GOOD">BOM ESTADO</option>
              <option value="UNDER_MAINTENANCE">EM MANUTENÇÃO PREVENTIVA</option>
              <option value="DEFFECTED">COM DEFEITO</option>
            </select>
            {formState.errors.conservationStatus && <span className="text-rose-400 text-xs mt-1">{formState.errors.conservationStatus.message}</span>}
          </div>

          {/* Observações */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="observation" className={labelStyles}>
              Observações <span className="text-slate-500 font-normal normal-case">(opcional)</span>
            </Label>
            <textarea
              {...register('observation')}
              id="observation"
              placeholder="Detalhes adicionais sobre restrições de uso, sinistros, características especiais..."
              className="w-full min-h-[80px] sm:min-h-[88px] p-3.5 text-sm bg-slate-900 border border-slate-700 text-slate-100 rounded-none placeholder:text-slate-500 resize-y focus:border-[#0f5c2c] focus:ring-1 focus:ring-[#0f5c2c] transition-all"
            />
            {formState.errors.observation && <span className="text-rose-400 text-xs mt-1">{formState.errors.observation.message}</span>}
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-800 pt-6 mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="rounded-none font-bold text-xs tracking-wider uppercase hover:bg-slate-900 hover:text-white text-slate-400 px-6 h-11 order-2 sm:order-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="bg-[#093a1c] hover:bg-[#0f5c2c] active:bg-[#093a1c] text-white font-bold text-xs tracking-wider uppercase rounded-none px-8 h-11 order-1 sm:order-2"
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

export default AddVeiculo;