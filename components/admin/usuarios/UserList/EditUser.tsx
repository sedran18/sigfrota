// components/admin/usuarios/EditUser.tsx
"use client"

import { Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateUserSchema, UpdateUserType, UserListItemType } from "@/schemas/user.schema"
import { updateUser } from "@/lib/actions/user"
import { useState } from "react"

const EditUser = ({ usuario }: { usuario: UserListItemType }) => {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, formState, reset, setError } = useForm<UpdateUserType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: usuario.name,
      password: "",
      role: usuario.role,
      active: usuario.active,
    },
  })

  const onSubmit = async (data: UpdateUserType) => {
    const payload = { ...data, password: data.password || undefined }
    const res = await updateUser(usuario.id, payload)

    if (!res.success) {
      setError("root", { type: "manual", message: res.error })
      return
    }

    setOpen(false)
  }

  const selectStyles = `
    w-full h-11 px-3 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200 
    rounded-none cursor-pointer uppercase tracking-wider outline-none transition-all
    focus:border-[#093a1c] focus:ring-1 focus:ring-[#093a1c]
  `

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="flex items-center justify-center h-9 w-9 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-none cursor-pointer transition-all">
        <Edit2 size={14} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 text-slate-200 rounded-none p-6 shadow-2xl">
        <DialogHeader className="border-b border-slate-900 pb-4 mb-2">
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-white">
            Editar Usuário
          </DialogTitle>
        </DialogHeader>

        {formState.errors.root && (
          <span className="text-xs text-rose-400">{formState.errors.root.message}</span>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Nome de usuário
            </Label>
            <Input
              {...register("name")}
              id="name"
              className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-[#093a1c]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Nova senha (deixe em branco para manter)
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-none bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-[#093a1c]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Papel
            </Label>
            <select {...register("role")} id="role" className={selectStyles}>
              <option value="USER">Funcionário</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-300 cursor-pointer select-none">
            <input
              {...register("active")}
              type="checkbox"
              className="h-4 w-4 accent-[#093a1c] cursor-pointer"
            />
            Usuário ativo
          </label>

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
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUser