import type { Metadata } from 'next'
import '../globals.css'

// Fallback: avoid loading remote or invalid local fonts during dev/build
const inter = { className: '' }
import { AuthProvider } from '@/components/providers/AuthProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'


export const metadata: Metadata = {
  title: 'TemuPro - Shop Smarter, Save Bigger',
  description: 'Discover incredible deals on millions of quality products',
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
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main suppressHydrationWarning className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}