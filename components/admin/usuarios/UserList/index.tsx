import { UserListItemType } from "@/schemas/user.schema"
import UserCard from "./UserCard"

const UserList = ({ usuarios }: { usuarios: UserListItemType[] }) => {
  return (
    <div className="grid p-1 md:p-2 lg:p-10 px-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {usuarios.map((u) => (
        <UserCard key={u.id} usuario={u} />
      ))}
    </div>
  )
}

export default UserList