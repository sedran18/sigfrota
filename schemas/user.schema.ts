import z from "zod";
import { UserRoleSchema } from "./enums.schema";

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2).max(100),
  email: z.email(),
  role: UserRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserType = z.infer<typeof UserSchema>;