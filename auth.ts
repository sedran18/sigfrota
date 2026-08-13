import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        name: {},
        password: {},
      },
      authorize: async (credentials) => {
        const name = credentials?.name as string | undefined
        const password = credentials?.password as string | undefined

        if (!name || !password) return null

        const user = await prisma.user.findUnique({
          where: { name, active: true },
        })

        if (!user) return null

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return null

        return {
          id: user.id,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "ADMIN" | "USER"
      }
      return session
    },
  },
})