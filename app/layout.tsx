import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import Navbar from '@/components/layout/Navbar'

// Use a safe fallback className (no remote font) to avoid network requests or invalid local font files
const inter = { className: '' }

export const metadata = {
  title: 'TemuPro - Professional E-commerce Platform',
  description: 'Your professional e-commerce platform for amazing shopping experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* Navbar is placed here so it shows on every page */}
          <div className="min-h-screen">
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}