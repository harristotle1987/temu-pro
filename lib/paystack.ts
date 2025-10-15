import { Paystack } from '@paystack/paystack-sdk'

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!)

export interface InitializeTransactionParams {
  email: string
  amount: number
  reference: string
  callback_url?: string
  metadata?: any
}

export async function initializeTransaction(params: InitializeTransactionParams) {
  try {
    const response = await paystack.transaction.initialize({
      email: params.email,
      amount: params.amount * 100, // Convert to kobo
      reference: params.reference,
      callback_url: params.callback_url,
      metadata: params.metadata
    })

    return response.data
  } catch (error) {
    console.error('Paystack initialization error:', error)
    throw error
  }
}

export async function verifyTransaction(reference: string) {
  try {
    const response = await paystack.transaction.verify(reference)
    return response.data
  } catch (error) {
    console.error('Paystack verification error:', error)
    throw error
  }
}

export default {
  initializeTransaction,
  verifyTransaction
}