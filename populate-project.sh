#!/bin/bash

echo "🚀 Populating TemuPro E-commerce Platform Files..."
echo "=================================================="

# Function to create directory if it doesn't exist
ensure_dir() {
    mkdir -p "$(dirname "$1")"
}

# 1. PRISMA SCHEMA (Database)
echo "📊 Creating Prisma schema..."
ensure_dir "./prisma/schema.prisma"
cat > "./prisma/schema.prisma" << 'PRISMA_EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      String   @default("CUSTOMER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  cart      Cart?
  orders    Order[]
  products  Product[] @relation("SellerProducts")
  
  @@map("users")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  images      String[]
  category    String
  inventory   Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  sellerId    String
  seller      User     @relation("SellerProducts", fields: [sellerId], references: [id], onDelete: Cascade)
  cartItems   CartItem[]
  
  @@map("products")
}

model Cart {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     CartItem[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("carts")
}

model CartItem {
  id        String  @id @default(cuid())
  cartId    String
  productId String
  quantity  Int     @default(1)
  
  cart      Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@unique([cartId, productId])
  @@map("cart_items")
}

model Order {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  totalAmount Float
  status      String   @default("PENDING")
  paystackRef String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("orders")
}
PRISMA_EOF

# 2. UTILITY FILES
echo "🔧 Creating utility files..."
ensure_dir "./lib/utils.ts"
cat > "./lib/utils.ts" << 'UTILS_EOF'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(price)
}
UTILS_EOF

# 3. CORE LAYOUT
echo "🏗️ Creating core layout..."
ensure_dir "./app/layout.tsx"
cat > "./app/layout.tsx" << 'LAYOUT_EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
LAYOUT_EOF

# 4. GLOBAL CSS
echo "🎨 Creating global styles..."
ensure_dir "./app/globals.css"
cat > "./app/globals.css" << 'CSS_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

.gradient-bg {
  background: linear-gradient(135deg, #FF6B35 0%, #FF8E53 50%, #2EC4B6 100%);
}

.text-gradient {
  background: linear-gradient(135deg, #FF6B35, #2EC4B6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
CSS_EOF

# 5. MAIN PAGE
echo "🏠 Creating main page..."
ensure_dir "./app/page.tsx"
cat > "./app/page.tsx" << 'PAGE_EOF'
export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-8">
      <div className="text-center text-white max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-gradient">TemuPro</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed">
          Your professional e-commerce platform is ready! 
          Amazing shopping experiences are here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-[#FF6B35] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Explore Products
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors">
            Seller Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
PAGE_EOF

echo "✅ Core files populated successfully!"
echo ""
echo "🚀 Next steps:"
echo "   1. Run: npx prisma generate"
echo "   2. Run: npx prisma db push" 
echo "   3. Run: npm run dev"
echo ""
echo "🎉 Your TemuPro platform is now ready!"