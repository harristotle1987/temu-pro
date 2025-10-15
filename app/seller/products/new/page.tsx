"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/context/ToastContext'

export default function NewProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [inventory, setInventory] = useState('')
  const [images, setImages] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { showToast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const body = {
        name,
        description,
        price: parseFloat(price) || 0,
        category,
        inventory: parseInt(inventory || '0', 10),
        images: images ? images.split('\n').map(s => s.trim()).filter(Boolean) : []
      }

      const res = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const err = await res.json()
        showToast(err?.error || 'Failed to create product', 'error')
        setLoading(false)
        return
      }

      showToast('Product created', 'success')
      router.push('/seller/products')
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input id="price" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200" />
          </div>
          <div>
            <label htmlFor="inventory" className="block text-sm font-medium text-gray-700">Inventory</label>
            <input id="inventory" value={inventory} onChange={e => setInventory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200" />
          </div>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images (one URL per line)</label>
          <textarea id="images" value={images} onChange={e => setImages(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-200" />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Product'}</Button>
        </div>
      </form>
    </div>
  )
}
