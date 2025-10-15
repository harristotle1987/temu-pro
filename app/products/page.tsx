import { redirect } from 'next/navigation'

export default function ProductsPage() {
  // Server-side redirect to the customer-facing products listing
  redirect('/customer')
}
