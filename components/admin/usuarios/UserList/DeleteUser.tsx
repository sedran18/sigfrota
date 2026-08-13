"use client"

import { Trash2 } from "lucide-react"
import { removeUser } from "@/lib/actions/user"
import { useState } from "react"

const DeleteUser = ({ id, name }: { id: string; name: string }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(`Remover o usuário "${name}"? Essa ação não pode ser desfeita.`)
    if (!confirmed) return

    setLoading(true)
    const res = await removeUser(id)
    setLoading(false)

    if (!res.success) {
      alert(res.error)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center justify-center h-9 w-9 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-none cursor-pointer transition-all disabled:opacity-50"
    >
      <Trash2 size={14} />
    </button>
  )
}

export default DeleteUser