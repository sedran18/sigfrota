"use client";

import { Input } from "@/components/ui/input";
import { FuelType, FuelTypeSchema } from "@/schemas/enums.schema";
import {  useFieldArray, useFormContext } from "react-hook-form";
import { CreateContractType } from "@/schemas/contract.schema";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


const AddContractFuel = () => {
    const form = useFormContext<CreateContractType>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "contractFuels",
    });

  const fuelTypes: FuelType[] = FuelTypeSchema.options;

  return (
    <div className="w-full space-y-3 pt-2">
      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Combustíveis do Contrato
        </span>
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
          className="flex items-center gap-1.5 border-slate-800 bg-slate-900 text-emerald-400 hover:text-white hover:bg-slate-800 rounded-none h-9 text-xs font-bold uppercase tracking-wider"
        >
          <Plus size={14} />
          Adicionar
        </Button>
      </div>

      <div className="space-y-3 w-full">
        {fields.length === 0 && (
          <div className="text-center py-6 border border-dashed border-slate-900 bg-slate-900/30 text-xs text-slate-500 font-medium">
            Nenhum combustível adicionado a este contrato ainda.
          </div>
        )}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-slate-900/50 border border-slate-900 items-end transition-all duration-200 hover:border-slate-800"
          >
            {/* Combustível */}
            <div className="sm:col-span-5 flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Combustível
              </label>
              <select
                {...form.register(`contractFuels.${index}.fuelType`)}
                className="w-full h-10 px-2 rounded-none border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#093a1c] uppercase"
              >
                {fuelTypes.map((fuelType) => (
                  <option value={fuelType} key={fuelType} className="bg-slate-950">
                    {fuelType}
                  </option>
                ))}
              </select>
            </div>

            {/* Preço por Litro */}
            <div className="sm:col-span-3 flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Preço / Litro
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="R$ 0,00"
                className="h-10 bg-slate-950 border-slate-800 text-slate-100 font-mono text-xs rounded-none focus-visible:ring-[#093a1c]"
                {...form.register(`contractFuels.${index}.pricePerLiter`, {
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* Litros Contratados */}
            <div className="sm:col-span-3 flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Litros
              </label>
              <Input
                type="number"
                placeholder="0"
                className="h-10 bg-slate-950 border-slate-800 text-slate-100 font-mono text-xs rounded-none focus-visible:ring-[#093a1c]"
                {...form.register(`contractFuels.${index}.litersContracted`, {
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* Remover */}
            <div className="sm:col-span-1 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-10 w-10 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded-none transition-colors shrink-0"
                title="Remover combustível"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddContractFuel;