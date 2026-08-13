import HeaderTemplate from "@/components/admin/HeaderTemplate"
import AddUser from "@/components/admin/usuarios/AddUser"
import UserList from "@/components/admin/usuarios/UserList"
import { getUsers } from "@/lib/actions/user" 
import { UsersRound } from "lucide-react"

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
        <div className="flex m-2 lg:m-10 flex-col items-center justify-center text-center p-12 bg-slate-50 border border-slate-200 rounded-none">
          <UsersRound size={32} className="text-slate-400 mb-2.5" />
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Nenhum usuário cadastrado
          </h3>
        </div>
      )}
    </div>
  )
}

export default UsuariosPage