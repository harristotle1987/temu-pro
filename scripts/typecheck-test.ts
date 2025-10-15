import type { AuthOptions } from 'next-auth'

// This test ensures our project uses the NextAuth `newUser` pages key.
const authConfig: Partial<AuthOptions> = {
  pages: {
  signIn: '/signin',
    newUser: '/auth/signup'
  }
}

export default authConfig
