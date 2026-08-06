"use client"

import { Edit2, Plus } from "lucide-react";
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
import { useForm, useWatch} from "react-hook-form";
import { CreateFuelingRequestSchema, CreateFuelingRequestType, GetFuelingRequestType} from "@/schemas/fuelingRequest.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFuelingRequest, updateFuelingRequest } from "@/lib/actions/fuelingRequest";
import { useEffect, useMemo, useRef, useState } from "react";
import { getVehiclesSelectByFuelType, SelectedVehicle } from "@/lib/actions/vehicle";
import { FuelTypeSchema } from "@/schemas/enums.schema";
import { useFuelingData } from "@/providers/FuelingDataProvider";


const AddRequest = ({request}: {
  request?: GetFuelingRequestType,
}) => {
  const [open, setOpen] = useState(false);
  const [fullTank, setFullTank] = useState(request ? request.liters === 'FULL' : true)
  const [veiculos, setVeiculos] = useState<SelectedVehicle<{id:true, plate: true, model: true, brand:true, year: true}>[]>([]);
  
  const { postos, motoristas } = useFuelingData();
  
  const form = useForm<CreateFuelingRequestType>({
    resolver: zodResolver(CreateFuelingRequestSchema),
    defaultValues: {
      fuelType: request ? request.fuelType : 'GASOLINA_COMUM',
      vehicleId: request ? request.vehicleId : '',
      driverId: '',
      gasStationId: '',
      liters: 'FULL',
    }
  });
  const formDefaults = useMemo(() => {
    if (!request) return undefined;
    const { contractFuel, driver, vehicle, status, createdAt, updatedAt, id, ...requestData } = request;
    return { ...requestData, gasStationId: contractFuel.contract.gasStation.id };
  }, [request]);


  const {register, handleSubmit, formState, setValue} =  form;
  const fuelType = useWatch({control: form.control, name: 'fuelType' });
  const litersValue = useWatch({control: form.control, name: 'liters' });

  // só pode atualizar se o fueling não for completo
  const onSubmit = async (data: CreateFuelingRequestType) => {
    const res =  
    request 
      ? 
        await updateFuelingRequest(request.id, {...formDefaults, ...data})
      : 
        await createFuelingRequest({...data});
    
    if (!res.success) return form.setError('root', {type: 'manual', message: res.error});

    form.reset();
    setOpen(false);
  }

  useEffect(() => {
    if (formDefaults) {
      form.reset(formDefaults)
    }
  }, [formDefaults, form]);
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchVeiculos = async () => {
      if (!fuelType) {
        setVeiculos([]);
        return;
      }
      
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else {
        setValue('vehicleId', '');
      }
      // Verifica se veículo é ativo
      const response = await getVehiclesSelectByFuelType(
        { id: true, plate: true, model: true, brand: true, year: true },
        fuelType,
        true,
      );

      if (!response.success) {
        setVeiculos([]);
        return;
      }

      setVeiculos(response.data);
    };

    fetchVeiculos();
  }, [fuelType, setValue]);

  const fuelTypes = FuelTypeSchema.options;

  const selectStyles = `
    w-full h-11 px-3 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200 
    rounded-none cursor-pointer uppercase tracking-wider outline-none transition-all
    focus:border-[#093a1c] focus:ring-1 focus:ring-[#093a1c]
  `;

  const onError = (err: unknown) => {
      console.log("Erros de validação encontrados:", err);
      
      // Exemplo: Mostrar um toast de aviso ou focar no primeiro erro
      alert("Por favor, preencha todos os campos obrigatórios!");
    };
  
const handleOpenChange = (isOpen: boolean) => {

  setOpen(isOpen);

  if (!isOpen) {
    form.reset(formDefaults ?? {
      fuelType: 'GASOLINA_COMUM',
      vehicleId: '',
      driverId: '',
      odometer: "" as unknown as number,
      gasStationId: '',
      liters: 'FULL',
    });
    setFullTank(request ? request.liters === 'FULL' : true);
  }
};

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger 
        className="
          flex items-center w-full min-w-55 justify-center gap-2 h-11 
          bg-[#093a1c] text-white text-xs font-bold uppercase tracking-wider 
          rounded-none cursor-pointer shadow-md transition-all duration-150
          hover:bg-[#093a1c]/90
        "
      >
        {
          request ? 
            <>
              <Edit2 size={16} />
              Editar
            </>
          :
            <>
              <Plus size={16} />
              Adicionar Solicitação
            </>
        }
      </DialogTrigger>
      
      <DialogContent 
        className="sm:max-w-md bg-slate-950 border border-slate-800 text-slate-200 rounded-none p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            Adicionar Nova Solicitação
          </DialogTitle>
        </DialogHeader>
        {
          formState.errors.root && (
            <span>{formState.errors.root.message}</span>
          )
        }
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="carro" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Veículo</Label>
            <select  
              {...register('vehicleId')}
              id="carro" 
              className={selectStyles} 
              >
              <option value="" disabled>{veiculos.length > 0 ? 'Selecione o veículo' : 'Não há veículos disponíveis para esse combustível'}</option>

              {veiculos.length > 0 &&
                veiculos.map(v => (
                  <option value={v?.id} key={v?.id} className="bg-slate-950">{v?.brand}, {v?.model}, {v?.plate}, {v?.year}</option>
                ))
              }
            </select>
            {
              formState.errors.vehicleId && 
              (
                <span>{formState.errors.vehicleId.message}</span>
              )
            }
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="motorista" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Motorista</Label>
            <select 
              {...register('driverId')}
              id="motorista" 
              className={selectStyles} 
              >
              <option value="" disabled>{motoristas?.length > 0 ? 'Selecione o motorista' : 'Não há motoristas disponíveis'}</option>

              {motoristas.length > 0 && motoristas.map(m => (
                <option value={m.id} key={m.id} className="bg-slate-950">{m.name}</option>
              ))}
            </select>
            {
              formState.errors.driverId && 
              (
                <span>{formState.errors.driverId.message}</span>
              )
            }
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="posto" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Posto de Combustível</Label>
            <select
              {...register('gasStationId')}
              id="posto" 
              className={selectStyles} 
              >
              <option value="" disabled>{postos.length > 0 ? 'Selecione o posto' : 'Não há postos disponíveis'}</option>
              {postos.length > 0 && postos.map(p => (
                <option value={p.id} key={p.id} className="bg-slate-950">{p.name}</option>
              ))}
            </select>
            {
              formState.errors.gasStationId && 
              (
                <span>{formState.errors.gasStationId.message}</span>
              )
            }
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="combustivel" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tipo de Combustível</Label>
            <select 
              {...register('fuelType')}
              id="combustivel" 
              className={selectStyles} 
              >
              <option value="" disabled hidden>Selecione o combustível</option>
              {
                fuelTypes.map(f => <option value={f} key={f}>{f.includes('_') ? f.replace('_', ' ') : f }</option>)
              }
            </select>
            {
              formState.errors.fuelType && 
              (
                <span>{formState.errors.fuelType.message}</span>
              )
            }
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 justify-end">
              <Label htmlFor="km" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quilometragem Inicial (KM)</Label>
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

            <div className="flex flex-col gap-1.5 justify-end">
              <label className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-emerald-400 cursor-pointer pb-1 mb-0.5 select-none">
                <input 
                  checked={fullTank}
                  onChange={() => {
                    const next = !fullTank;
                    setFullTank(next);
                    setValue('liters', next ? 'FULL' : 0, { shouldValidate: true });
                  }}
                  type="checkbox"
                  id="encher"
                  className="h-5 w-5 accent-[#093a1c] cursor-pointer" 
                />
                Completar tanque
              </label>
              
              <Label htmlFor="litros" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Litros à abastecer</Label>
              <Input 
                  id="litros"
                  type="number" 
                  step="0.01"
                  disabled={fullTank} 
                  value={fullTank || !litersValue || litersValue === 'FULL' ? '' : litersValue} 
                  onChange={e => {
                    setValue('liters', Number(e.target.value), { shouldValidate: true });
                  }}
                  placeholder={fullTank ? "Tanque Cheio" : "Ex: 45.50"}
                  className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono focus-visible:ring-[#093a1c] disabled:opacity-40 disabled:cursor-not-allowed"
                />
              {
                formState.errors.liters && 
                  (
                    <span>{formState.errors.liters.message}</span>
                  )
              }
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-900 pt-4 mt-2">
            <Button 
              type="button" 
              variant="ghost"
              onClick={() => handleOpenChange(false)}
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

export default AddRequest;