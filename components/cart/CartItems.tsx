import CartItemRow from './CartItem'
import type { CartItem } from '@/types'

interface CartItemsProps {
  // Allow any here because some Prisma queries select partial nested fields (e.g. seller.name only)
  items: any[]
}

export function CartItems({ items }: CartItemsProps) {
  if (!items || items.length === 0) return <div className="p-6">No items</div>

  // Cast to any to ensure JSX sees this as a component with props.
  const ItemComp: any = CartItemRow

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <ItemComp key={item.id} item={item} />
        ))}
      </div>
    )
}
