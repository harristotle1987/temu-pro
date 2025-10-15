import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect seller routes
        if (req.nextUrl.pathname.startsWith('/seller')) {
          return token?.role === 'SELLER'
        }
        
        // Protect customer routes (except public ones)
        if (req.nextUrl.pathname.startsWith('/cart') || 
            req.nextUrl.pathname.startsWith('/orders')) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/seller/:path*',
    '/cart',
    '/orders',
    '/profile',
  ]
}