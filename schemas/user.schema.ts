import { z } from "zod"
import { UserRole } from "@/lib/generated/prisma/enums" 

export const CreateUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(UserRole),
})
export type CreateUserType = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  password: z.string().min(6).optional().or(z.literal("")), 
  role: z.enum(UserRole).optional(),
  active: z.boolean().optional(),
})
export type UpdateUserType = z.infer<typeof UpdateUserSchema>

export const UserIdSchema = z.string().uuid()
export type UserIdType = z.infer<typeof UserIdSchema>

export type UserListItemType = {
  id: string
  name: string
  role: UserRole
  active: boolean
  createdAt: Date
}