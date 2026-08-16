import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { authConfig } from "@/auth.config"

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials"
}

class InactiveAccountError extends CredentialsSignin {
  code = "inactive_account"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        name: {},
        password: {},
      },
      authorize: async (credentials) => {
        const name = credentials?.name as string | undefined
        const password = credentials?.password as string | undefined

        if (!name || !password) throw new InvalidCredentialsError()

        const user = await prisma.user.findUnique({ where: { name } })

        if (!user) throw new InvalidCredentialsError()
        if (!user.active) throw new InactiveAccountError()

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) throw new InvalidCredentialsError()

        return { id: user.id, name: user.name, role: user.role }
      },
    }),
  ],
})