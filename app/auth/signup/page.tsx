import { redirect } from 'next/navigation'

export default function LegacySignup() {
  // Redirect legacy /auth/signup to /signup
  redirect('/signup')
}
