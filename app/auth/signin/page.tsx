import { redirect } from 'next/navigation'

export default function LegacySignin() {
  // Redirect legacy /auth/signin to /signin
  redirect('/signin')
}
