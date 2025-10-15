import 'next-auth'

declare module 'next-auth' {
  // Extend PagesOptions to accept `signUp` as an alias for `newUser`.
  interface PagesOptions {
    // existing keys are already defined upstream; we add signUp as optional
    signUp?: string
  }
}
