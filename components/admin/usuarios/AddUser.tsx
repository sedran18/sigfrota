"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserSchema, CreateUserType } from "@/schemas/user.schema"
import { createUser } from "@/lib/actions/user"
import { useState } from "react"

const AddUser = () => {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, formState, reset, setError } = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      password: "",
      role: "USER",
    },
  })

  const onSubmit = async (data: CreateUserType) => {
    const res = await createUser(data)

    if (!res.success) {
      setError("root", { type: "manual", message: res.error })
      return
    }

    reset()
    setOpen(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) reset()
  }

const selectStyles = `
   w-full min-w-0 h-11 px-3 text-base font-semibold bg-slate-900 border border-slate-800 text-slate-200 
   rounded-none cursor-pointer uppercase tracking-wider outline-none transition-all appearance-none
   focus:border-[#093a1c] focus:ring-1 focus:ring-[#093a1c] font-mono
 `

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
    <DialogTrigger
      className="
        flex items-center w-full sm:w-auto justify-center gap-2 h-11 
        bg-[#093a1c] text-white text-xs font-bold uppercase tracking-wider 
        rounded-none cursor-pointer shadow-md transition-all duration-150
        hover:bg-[#093a1c]/90 px-4
      "
    >
        <Plus size={16} />
        Adicionar Usuário
      </DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-md bg-slate-950 border border-slate-800 text-slate-200 rounded-none p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white w-[85%]">
            Adicionar Novo Usuário
          </DialogTitle>
        </DialogHeader>

        {formState.errors.root && (
          <div className="border border-rose-900 bg-rose-950/40 px-3 py-2 text-xs font-semibold text-rose-400">
            {formState.errors.root.message}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1.5 w-full min-w-0">
            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Nome de usuário
            </Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="Ex: joao.silva"
              className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono text-base focus-visible:ring-[#093a1c] w-full min-w-0"
            />
            {formState.errors.name && (
              <span className="text-xs text-rose-400">{formState.errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 w-full min-w-0">
            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Senha
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 font-mono text-base focus-visible:ring-[#093a1c] w-full min-w-0"
            />
            {formState.errors.password && (
              <span className="text-xs text-rose-400">{formState.errors.password.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 w-full min-w-0">
            <Label htmlFor="role" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Papel
            </Label>
            <select {...register("role")} id="role" className={selectStyles}>
              <option value="USER">Funcionário</option>
              <option value="ADMIN">Administrador</option>
            </select>
            {formState.errors.role && (
              <span className="text-xs text-rose-400">{formState.errors.role.message}</span>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 border-t border-slate-900 pt-4 mt-2">
           <Button 
              type="button" 
              variant="ghost" 
              onClick={() => handleOpenChange(false)} 
              className="w-full sm:w-auto h-11 rounded-none cursor-pointer font-bold text-xs tracking-wider uppercase text-slate-400 hover:text-white hover:bg-slate-900">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-[#093a1c] hover:bg-[#093a1c]/90 text-white font-bold text-xs tracking-wider uppercase rounded-none px-6 h-11"
            >
              Criar Usuário
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddUser