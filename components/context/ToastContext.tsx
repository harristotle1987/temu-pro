"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

type Toast = { id: string; message: string; type?: 'info' | 'success' | 'error' }

const ToastContext = createContext({
  showToast: (message: string, type?: Toast['type']) => {}
})

export const useToast = () => useContext(ToastContext)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = String(Date.now())
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000)
  }, [])

  useEffect(() => {
    // mark mounted so we only render the toast container on the client
    setMounted(true)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && (
        <div aria-live="polite" className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <div key={toast.id} className={`px-4 py-2 rounded shadow-lg text-white ${toast.type === 'error' ? 'bg-red-600' : toast.type === 'success' ? 'bg-green-600' : 'bg-gray-800'}`}>
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}
