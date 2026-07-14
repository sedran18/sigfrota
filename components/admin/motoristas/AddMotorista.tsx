"use client"

import { Plus, User, Edit2, Phone, AlertCircle, Loader2 } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDriverSchema, CreateDriverType, DriverType } from "@/schemas/driver.schema";
import { createDriver, updateDriver } from "@/lib/mockActions/driver";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddMotorista = ({driver}: {driver?:DriverType}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateDriverType>({
    resolver: zodResolver(CreateDriverSchema),
    defaultValues: {
      name: driver?.name ?? "",
      phone: driver?.phone ?? "",
    },
  });

  useEffect(() => {
  form.reset({
    name: driver?.name,
    phone: driver?.phone,
  });
}, [driver, form]);

  const router =  useRouter();

  const handleSubmit = async (data: CreateDriverType) => {
    if (driver) {
      const motorista = await updateDriver(driver.id, data);
      if (!motorista.success) {
        form.setError("root", { type: "manual", message: motorista.error});
        return;
      }
    } else {
      const motorista = await createDriver(data);
      if (!motorista.success) {
        form.setError("root", { type: "manual", message: motorista.error });
        return;
      }
    }
    form.reset();
    router.refresh();
    setOpen(false);

  };

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  const inputStyles = `
    h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 
     font-medium transition-colors duration-150 text-[10px] md:text-md
    focus-visible:ring-2 focus-visible:ring-[#0f5c2c] focus-visible:ring-offset-0
    focus-visible:border-[#0f5c2c] hover:border-slate-700
  `;

  const fieldError = (message?: string) =>
    message && (
      <span className="flex items-center gap-1.5 text-[11px] font-medium text-rose-400/90 mt-0.5">
        <AlertCircle size={12} className="shrink-0" />
        {message}
      </span>
    );

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) form.reset();
        setOpen(value);
      }}
    >
      <DialogTrigger className="bg-[#093a1c] flex items-center justify-center cursor-pointer hover:bg-[#0f5c2c] active:bg-[#093a1c] transition-colors duration-150 text-white font-bold text-xs tracking-wider uppercase rounded-none h-11 px-4 gap-2 shadow-md hover:shadow-lg hover:shadow-[#093a1c]/30">
        {driver? <><Edit2 size={16} /> Editar </> : <> <Plus size={16} /> Adicionar Motorista </>} 
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 rounded-none p-6 shadow-2xl shadow-black/50 text-white">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2 relative">
          <span className="absolute -left-6 top-0 bottom-4 w-[3px] bg-[#093a1c]" />
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            {driver ? 'Atualizar' : 'Cadastrar Novo'} Condutor
          </DialogTitle>
          <p className="text-[11px] font-medium  tracking-wide">
            Preencha os dados abaixo
          </p>
        </DialogHeader>

        {form.formState.errors.root && (
          <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-900/60 px-3 py-2 text-xs font-medium text-rose-300">
            <AlertCircle size={14} className="shrink-0" />
            {form.formState.errors.root.message}
          </div>
        )}


        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 text-white">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="driver_name"
              className="text-[10px] font-bold uppercase tracking-wider"
            >
              Nome Completo *
            </Label>

            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                {...form.register("name")}
                id="driver_name"
                placeholder="EX: CARLOS ALBERTO SILVA"
                className={`${inputStyles} uppercase pl-9`}
              />
            </div>

            {fieldError(form.formState.errors.name?.message)}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="driver_phone"
              className="text-[10px] font-bold uppercase tracking-wider"
            >
              Telefone corporativo / pessoal *
            </Label>

            <div className="relative">
              <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                {...form.register("phone")}
                id="driver_phone"
                type="tel"
                placeholder="(00) 00000-0000"
                className={`${inputStyles} font-mono pl-9`}
              />
            </div>

            {fieldError(form.formState.errors.phone?.message)}
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-900 pt-4 mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="rounded-none cursor-pointer font-bold text-xs tracking-wider uppercase hover:text-white hover:bg-slate-900 transition-colors duration-150"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="cursor-pointer bg-[#093a1c] hover:bg-[#0f5c2c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs tracking-wider uppercase rounded-none px-1 sm:px-2 md:px-6 h-11 transition-colors duration-150 flex items-center gap-2"
            >
              {form.formState.isSubmitting && <Loader2 size={14} className="animate-spin" />}
              Salvar Condutor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMotorista;