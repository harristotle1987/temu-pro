import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SellerSidebar } from '@/components/seller/SellerSidebar'

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== 'SELLER') {
    redirect('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SellerSidebar />
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  )
}