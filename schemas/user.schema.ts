import { z } from "zod";
import { UserRole } from "@prisma/client";

export const CreateUserSchema = z.object({
  name: z
    .string({ error: "Nome tem tipo inválido" })
    .min(3, { error: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { error: "Nome deve ter no máximo 100 caracteres" }),
  password: z
    .string({ error: "Senha tem tipo inválido" })
    .min(6, { error: "Senha deve ter pelo menos 6 caracteres" }),
  role: z.enum(UserRole, { error: "Perfil de usuário inválido" }),
});
export type CreateUserType = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
  name: z
    .string({ error: "Nome tem tipo inválido" })
    .min(3, { error: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { error: "Nome deve ter no máximo 100 caracteres" })
    .optional(),
  password: z
    .string({ error: "Senha tem tipo inválido" })
    .min(6, { error: "Senha deve ter pelo menos 6 caracteres" })
    .optional()
    .or(z.literal("")),
  role: z.enum(UserRole, { error: "Perfil de usuário inválido" }).optional(),
  active: z.boolean({ error: "Active precisa ser boolean" }).optional(),
});
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;

export const UserIdSchema = z.uuid({ error: "Id com formato inválido" });
export type UserIdType = z.infer<typeof UserIdSchema>;

export type UserListItemType = {
  id: string;
  name: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
};