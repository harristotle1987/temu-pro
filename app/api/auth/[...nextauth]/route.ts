import NextAuth from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// Create the NextAuth handler within this app-route bundle and export it as the
// GET and POST handlers. This avoids cross-bundle vendor chunk resolution issues
// during dev when using a pre-initialized handler from another module.
const handler = (NextAuth as any)(authOptions)
export { handler as GET, handler as POST }