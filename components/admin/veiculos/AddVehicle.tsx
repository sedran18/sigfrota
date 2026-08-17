"use client"

import { Plus, Edit2, Loader2, AlertCircle } from "lucide-react";
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

const AddVehicle = ({ vehicle }: { vehicle?: VehicleWithUsageType }) => {

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

  const { register, formState, handleSubmit } = form;

  const onSubmit = async (data: CreateVehicleType) => {
    const res = vehicle ?
      await updateVehicle(vehicle.id, data)
      :
      await createVehicle(data);

    if (!res.success) return form.setError('root', { type: 'manual', message: res.error });

    form.reset();
    setOpen(false);
  }

  useEffect(() => {
    if (vehicle) {
      form.reset({ ...vehicle });
    } else {
      form.reset({
        plate: '',
        model: '',
        brand: '',
        year: 2024,
        fuelType: 'GASOLINA',
        conservationStatus: 'GOOD',
      });
    }
  }, [vehicle, form]);

  const inputStyles = `
    h-11 w-full min-w-0 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 
    placeholder:text-slate-500 font-medium text-base
    focus:border-[#0f5c2c] focus:ring-1 focus:ring-[#0f5c2c] 
    hover:border-slate-600 transition-all duration-200 font-mono
  `;

  const selectStyles = `
    h-11 w-full min-w-0 px-3 text-base font-semibold bg-slate-900 border border-slate-700 text-slate-100 
    rounded-lg cursor-pointer uppercase tracking-wider appearance-none
    focus:border-[#0f5c2c] focus:ring-1 focus:ring-[#0f5c2c]
    hover:border-slate-600 transition-all duration-200 font-mono
  `;

  const labelStyles = "text-[10px] font-bold uppercase tracking-[0.5px] text-slate-400";

  const fieldError = (message?: string) =>
    message && (
      <span className="flex items-center gap-1.5 text-[11px] font-medium text-rose-400 mt-1">
        <AlertCircle size={12} className="shrink-0" />
        {message}
      </span>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full sm:w-auto bg-[#093a1c] hover:bg-[#0f5c2c] active:bg-[#093a1c] flex items-center justify-center cursor-pointer text-white font-bold text-xs tracking-wider uppercase h-11 px-5 gap-2 shadow-md hover:shadow-lg hover:shadow-[#093a1c]/30 transition-all duration-200">
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

      <DialogContent className="w-[95vw] sm:w-full sm:max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col bg-slate-950 border border-slate-800 rounded-xl p-0 shadow-2xl shadow-black/80 overflow-hidden text-white">

        <DialogHeader className="shrink-0 border-b border-slate-800 px-6 sm:px-8 pt-5 sm:pt-6 pb-4 relative">
          <span className="absolute left-0 sm:left-2 top-0 bottom-5 w-1 bg-gradient-to-b from-[#093a1c] to-transparent" />
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2.5 sm:gap-3 w-[80%] sm:w-auto">
            {vehicle ? 'Atualizar Veículo' : 'Integrar Veículo à Frota'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6">
          {
            formState.errors.root && (
              <div className="flex items-center gap-2 text-rose-400 text-xs mb-4 bg-rose-950/40 border border-rose-900 rounded-lg px-3 py-2">
                <AlertCircle size={14} className="shrink-0" />
                {formState.errors.root.message}
              </div>
            )
          }
          <form id="vehicle-form" className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit(onSubmit)}>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5 min-w-0">
                <Label htmlFor="plate" className={labelStyles}>Placa *</Label>
                <Input
                  {...register('plate', { setValueAs: (v: string) => v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() })}
                  id="plate"
                  maxLength={7}
                  placeholder="ABC1D23"
                  className={`${inputStyles} uppercase tracking-widest`}
                />
                {fieldError(formState.errors.plate?.message)}
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <Label htmlFor="brand" className={labelStyles}>Marca *</Label>
                <Input
                  {...register('brand')}
                  id="brand"
                  placeholder="EX: FIAT"
                  className={`${inputStyles} uppercase`}
                />
                {fieldError(formState.errors.brand?.message)}
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <Label htmlFor="model" className={labelStyles}>Modelo *</Label>
                <Input
                  {...register('model')}
                  id="model"
                  placeholder="EX: STRADA"
                  className={`${inputStyles} uppercase`}
                />
                {fieldError(formState.errors.model?.message)}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              <div className="flex flex-col gap-1.5 min-w-0">
                <Label htmlFor="year" className={labelStyles}>Ano *</Label>
                <Input
                  {...register('year', { valueAsNumber: true })}
                  id="year"
                  type="number"
                  placeholder="2024"
                  className={inputStyles}
                />
                {fieldError(formState.errors.year?.message)}
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <Label htmlFor="tank_capacity" className={labelStyles}>Tanque (L) *</Label>
                <Input
                  {...register('tankCapacity', { valueAsNumber: true })}
                  id="tank_capacity"
                  type="number"
                  step="0.1"
                  placeholder="55"
                  className={inputStyles}
                />
                {fieldError(formState.errors.tankCapacity?.message)}
              </div>

              <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5 min-w-0">
                <Label htmlFor="fuel_type" className={labelStyles}>Combustível *</Label>
                <select {...register('fuelType')} id="fuel_type" className={selectStyles}>
                  <option value="GASOLINA">GASOLINA</option>
                  <option value="ETANOL">ETANOL</option>
                  <option value="DIESEL_COMUM">DIESEL COMUM</option>
                  <option value="DIESEL_S10">DIESEL S10</option>
                  <option value="FLEX">FLEX</option>
                </select>
                {fieldError(formState.errors.fuelType?.message)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
              <div className="flex flex-col gap-1.5 min-w-0">
                <Label htmlFor="current_odometer" className={labelStyles}>KM Inicial *</Label>
                <Input
                  {...register('currentOdometer', { valueAsNumber: true })}
                  id="current_odometer"
                  type="number"
                  placeholder="0"
                  className={inputStyles}
                />
                {fieldError(formState.errors.currentOdometer?.message)}
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <Label htmlFor="average_consumption_km_l" className={labelStyles}>Média (KM/L) *</Label>
                <Input
                  {...register('averageConsumption', { valueAsNumber: true })}
                  id="average_consumption_km_l"
                  type="number"
                  step="0.01"
                  placeholder="10.5"
                  className={inputStyles}
                />
                {fieldError(formState.errors.averageConsumption?.message)}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <Label htmlFor="conservation_status" className={labelStyles}>Status Operacional *</Label>
              <select {...register('conservationStatus')} id="conservation_status" className={selectStyles}>
                <option value="GOOD">BOM ESTADO</option>
                <option value="UNDER_MAINTENANCE">EM MANUTENÇÃO PREVENTIVA</option>
                <option value="DEFFECTED">COM DEFEITO</option>
              </select>
              {fieldError(formState.errors.conservationStatus?.message)}
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <Label htmlFor="observation" className={labelStyles}>
                Observações <span className="text-slate-500 font-normal normal-case">(opcional)</span>
              </Label>
              <textarea
                {...register('observation')}
                id="observation"
                placeholder="Detalhes adicionais sobre restrições de uso, sinistros, características especiais..."
                className="w-full min-w-0 min-h-[80px] sm:min-h-[88px] p-3.5 text-base bg-slate-900 border border-slate-700 text-slate-100 rounded-lg placeholder:text-slate-500 resize-y focus:border-[#0f5c2c] focus:ring-1 focus:ring-[#0f5c2c] transition-all"
              />
              {fieldError(formState.errors.observation?.message)}
            </div>
          </form>
        </div>

        <div className="shrink-0 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-800 px-5 sm:px-8 py-4 bg-slate-950">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto rounded-lg font-bold text-xs tracking-wider uppercase hover:bg-slate-900 hover:text-white text-slate-400 px-6 h-11"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="vehicle-form"
            disabled={formState.isSubmitting}
            className="w-full sm:w-auto bg-[#093a1c] hover:bg-[#0f5c2c] active:bg-[#093a1c] text-white font-bold text-xs tracking-wider uppercase rounded-lg px-8 h-11 flex items-center justify-center gap-2"
          >
            {formState.isSubmitting && <Loader2 size={14} className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicle;