import HeaderTemplate from "@/components/admin/HeaderTemplate"
import AddUser from "@/components/admin/usuarios/AddUser"
import UserList from "@/components/admin/usuarios/UserList"
import { getUsers } from "@/lib/actions/user" 
import { Inbox} from "lucide-react"

const UsuariosPage = async () => {
  const usuarios = await getUsers()

  return (
    <div>
      <HeaderTemplate title="Usuários" description="Gerencie os usuários com acesso ao sistema">
        <AddUser key="novo" />
      </HeaderTemplate>

      {usuarios.success && usuarios.data.length > 0 ? (
        <UserList usuarios={usuarios.data} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white border border-slate-200 rounded-none mx-auto my-6 sm:my-8 w-full max-w-xl shadow-none">
          <Inbox size={32} className="text-slate-400 mb-2 sm:mb-3 w-7 h-7 sm:w-8 sm:h-8" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Nenhum Usuário Cadastrado
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-1 uppercase font-medium">
            Cadastre novos administradores ou operadores do sistema.
          </p>
        </div>
      )}
    </div>
  )
}

export default UsuariosPage