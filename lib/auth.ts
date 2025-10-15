// @ts-nocheck - NextAuth types conflict with local PagesOptions usage; see lib/auth.ts
import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' as const },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) return null

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!passwordMatch) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  pages: {
    signIn: '/signin',
    newUser: '/signup'
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.sub!
      session.user.role = token.role as string
      return session
    }
  }
}

// Initialize NextAuth handler once and export its helpers
const nextAuthHandler = (NextAuth as any)(authOptions)
export const handlers = nextAuthHandler.handlers
export const auth = nextAuthHandler.auth
export const signIn = nextAuthHandler.signIn
export const signOut = nextAuthHandler.signOut

export default nextAuthHandler