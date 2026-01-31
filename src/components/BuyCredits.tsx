'use client'

import { useState } from 'react'
import { Zap, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface BuyCreditsProps {
  onSuccess?: () => void
  className?: string
  variant?: 'button' | 'card'
}

export default function BuyCredits({ onSuccess, className = '', variant = 'button' }: BuyCreditsProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBuyCredits = async () => {
    try {
      setLoading(true)
      setError(null)

      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setError('Please log in to purchase credits')
        return
      }

      // Create payment order
      const response = await fetch('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          credits: 500, // Fixed: 500 credits for $10
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create payment order')
      }

      const { orderId, amount, keyId, currency, usdAmount } = await response.json()

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
        
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
        })
      }

      // Format description - show USD amount
      const description = `500 Credits - 500 Pages - $${usdAmount?.toFixed(2) || '10.00'}`

      // Initialize Razorpay checkout
      const options = {
        key: keyId,
        amount: amount,
        currency: currency || 'USD',
        name: 'ScrapeBit',
        description: description,
        order_id: orderId,
        handler: async function(response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('http://localhost:3000/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                credits: 500,
              }),
            })

            const result = await verifyResponse.json()
            if (result.success) {
              if (onSuccess) {
                onSuccess()
              } else {
                // Reload page to update credits
                window.location.reload()
              }
            } else {
              setError(result.error || 'Payment verification failed')
            }
          } catch (err: any) {
            setError(err.message || 'Failed to verify payment')
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email,
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err: any) {
      setError(err.message || 'Failed to initiate payment')
      setLoading(false)
    }
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Buy Credits</h3>
            <p className="text-sm text-gray-500 mt-1">Get 500 credits for just $10</p>
          </div>
          <Zap className="w-8 h-8 text-amber-500" />
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Credits</span>
              <span className="text-lg font-bold text-gray-900">500</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">Price</span>
              <span className="text-lg font-bold text-gray-900">$10.00</span>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">1 credit = 1 page scraped</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            onClick={handleBuyCredits}
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-500 to-magenta-500 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Buy 500 Credits - $10</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleBuyCredits}
      disabled={loading}
      className={`bg-gradient-to-r from-brand-500 to-magenta-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <Zap className="w-4 h-4" />
          <span>Buy Credits</span>
        </>
      )}
    </button>
  )
}

