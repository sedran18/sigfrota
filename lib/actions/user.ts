"use server"

import bcrypt from "bcryptjs"
import { CreateUserSchema, CreateUserType, UpdateUserSchema, UpdateUserType, UserIdSchema, UserIdType, UserListItemType } from "@/schemas/user.schema"
import { ResponseType } from "../types"
import prisma from "../prisma"
import { Prisma } from "../generated/prisma/client"
import { requireAdmin } from "../auth-guard";
import { revalidatePath } from "next/cache"


export const getUsers = async (): Promise<ResponseType<UserListItemType[]>> => {
    await requireAdmin() 

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                role: true,
                active: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })

        return { success: true, data: users }
    } catch (err) {
        console.log(err)
        return { success: false, error: 'Erro ao listar usuários' }
    }
}

export const createUser = async (item: CreateUserType): Promise<ResponseType<string>> => {
    await requireAdmin()

    const v = CreateUserSchema.safeParse(item)
    if (!v.success) return { success: false, error: v.error.message }

    try {
        const hashedPassword = await bcrypt.hash(v.data.password, 10);
        const nameFormatted = v.data.name.replace(' ', '_').toLowerCase();

        await prisma.user.create({
            data: {
                name: nameFormatted,
                password: hashedPassword,
                role: v.data.role,
            },
        })

        revalidatePath('/admin/usuarios')
        return { success: true, data: 'Usuário criado com sucesso' }
    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            return { success: false, error: "Já existe um usuário com esse nome" }
        }
        return { success: false, error: 'Erro ao criar usuário' }
    }
}

export const updateUser = async (id: UserIdType, campos: UpdateUserType): Promise<ResponseType<string>> => {
    await requireAdmin()

    const vId = UserIdSchema.safeParse(id)
    if (!vId.success) return { success: false, error: 'ID inválido' }

    const vCampos = UpdateUserSchema.safeParse(campos)
    if (!vCampos.success) return { success: false, error: vCampos.error.message }

    try {
        const { password, ...rest } = vCampos.data

        await prisma.user.update({
            where: { id: vId.data },
            data: {
                ...rest,
                ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
            },
        })

        revalidatePath('/admin/usuarios')
        return { success: true, data: 'Usuário atualizado com sucesso' }
    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            return { success: false, error: "Já existe um usuário com esse nome" }
        }
        return { success: false, error: 'Erro ao atualizar usuário' }
    }
}

export const removeUser = async (id: UserIdType): Promise<ResponseType<string>> => {
    const session = await requireAdmin()

    const vId = UserIdSchema.safeParse(id)
    if (!vId.success) return { success: false, error: 'ID inválido' }

    if (session.user.id === vId.data) {
        return { success: false, error: 'Você não pode remover seu próprio usuário' }
    }

    try {
        await prisma.user.delete({ where: { id: vId.data } })

        revalidatePath('/admin/usuarios')
        return { success: true, data: 'Usuário removido com sucesso' }
    } catch (err) {
        console.log(err);
        return { success: false, error: 'Erro ao remover usuário. Usuário não pode ter abastecimentos ou solicitações em seu nome.' }
    }
}