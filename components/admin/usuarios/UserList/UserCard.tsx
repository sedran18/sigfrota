import { ShieldCheck, User as UserIcon } from "lucide-react"
import { UserListItemType } from "@/schemas/user.schema"
import EditUser from "./EditUser"
import DeleteUserBtn from "./DeleteUserBtn"

const UserCard = ({ usuario }: { usuario: UserListItemType }) => {
  const isAdmin = usuario.role === "ADMIN"

  return (
    <div className="relative flex flex-col justify-between gap-4 p-5 pt-3 bg-white border border-slate-200 rounded-none w-full bg-slate-50/50">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isAdmin ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
            {isAdmin ? <ShieldCheck size={16} /> : <UserIcon size={16} />}
          </span>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide truncate">
            {usuario.name}
          </h3>
        </div>

        <span
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
            usuario.active
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {usuario.active ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {isAdmin ? "Administrador" : "Funcionário"}
        </span>

        <div className="flex gap-2">
          <EditUser usuario={usuario} />
          <DeleteUserBtn id={usuario.id} name={usuario.name} />
        </div>
      </div>
    </div>
  )
}

export default UserCard