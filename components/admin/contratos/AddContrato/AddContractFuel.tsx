"use client";

import { Input } from "@/components/ui/input";
import { FuelType, FuelTypeSchema } from "@/schemas/enums.schema";
import {  useFieldArray, useFormContext } from "react-hook-form";
import { CreateContractType } from "@/schemas/contract.schema";
import { Fuel, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


const AddContractFuel = () => {
    const form = useFormContext<CreateContractType>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "contractFuels",
    });

  const fuelTypes: FuelType[] = FuelTypeSchema.options;

  return (
    <div className="w-full space-y-4">
      {/* Header com o botão de adicionar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wide">
          <Fuel size={18} className="text-[var(--secondary-color)]" />
          <span>Combustíveis do Contrato</span>
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              fuelType: fuelTypes[0],
              pricePerLiter: 0,
              litersContracted: 0,
            })
          }
          className="flex items-center gap-1.5 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg h-9 text-xs font-semibold"
        >
          <Plus size={15} />
          Adicionar Tipo
        </Button>
      </div>

      {/* Lista de campos dinâmicos */}
      <div className="space-y-3">
        {fields.length === 0 && (
          <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400 font-medium">
            Nenhum combustível adicionado a este contrato ainda.
          </div>
        )}

        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl transition-all duration-200 hover:border-slate-200"
          >
            {/* Tipo de Combustível */}
            <div className="flex-1 min-w-[140px]">
              <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1 tracking-wider">
                Combustível
              </label>
              <select
                {...form.register(`contractFuels.${index}.fuelType`)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-colors uppercase tracking-tight"
              >
                {fuelTypes.map((fuelType) => (
                  <option value={fuelType} key={fuelType}>
                    {fuelType}
                  </option>
                ))}
              </select>
            </div>

            {/* Preço por Litro */}
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1 tracking-wider">
                Preço / Litro
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="R$ 0,00"
                className="h-9 bg-white border-slate-200 text-sm font-semibold text-slate-700 font-mono rounded-lg"
                {...form.register(
                  `contractFuels.${index}.pricePerLiter`,
                  { valueAsNumber: true }
                )}
              />
            </div>

            {/* Litros Contratados */}
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1 tracking-wider">
                Litros Contratados
              </label>
              <Input
                type="number"
                placeholder="0"
                className="h-9 bg-white border-slate-200 text-sm font-semibold text-slate-700 font-mono rounded-lg"
                {...form.register(
                  `contractFuels.${index}.litersContracted`,
                  { valueAsNumber: true }
                )}
              />
            </div>

            {/* Botão de Remover */}
            <div className="flex items-end justify-end sm:pt-5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-9 w-9 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors shrink-0"
                title="Remover combustível"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddContractFuel;