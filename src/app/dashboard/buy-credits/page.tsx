'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import { useBilling } from '@/hooks/useBilling'
import BuyCredits from '@/components/BuyCredits'
import { Zap, Loader2, Gift, RotateCcw } from 'lucide-react'
import Link from 'next/link'

export default function BuyCreditsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const { user, checkAuth } = useAuthStore()
  const { billingStatus } = useBilling()
  const [loading, setLoading] = useState(true)
  const [autoLoginLoading, setAutoLoginLoading] = useState(false)

  // Handle auto-login from extension
  useEffect(() => {
    const handleAutoLogin = async () => {
      const token = searchParams.get('token')
      const refreshToken = searchParams.get('refreshToken')

      if (token && refreshToken && !user) {
        try {
          setAutoLoginLoading(true)
          
          // Set session using tokens from extension
          const { data: { session }, error } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: refreshToken,
          })

          if (error) {
            console.error('Auto-login error:', error)
            // If auto-login fails, redirect to login
            router.push('/login')
            return
          }

          if (session) {
            // Verify with backend
            const response = await fetch('http://localhost:3000/api/auth/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ accessToken: session.access_token }),
            })

            if (response.ok) {
              const result = await response.json()
              useAuthStore.getState().setUser(result.user)
              
              // Remove token from URL for security
              router.replace('/dashboard/buy-credits')
            } else {
              router.push('/login')
            }
          }
        } catch (error) {
          console.error('Auto-login failed:', error)
          router.push('/login')
        } finally {
          setAutoLoginLoading(false)
          setLoading(false)
        }
      } else {
        // No token, check if already logged in
        await checkAuth()
        const currentUser = useAuthStore.getState().user
        if (!currentUser) {
          router.push('/login')
        } else {
          setLoading(false)
        }
      }
    }

    handleAutoLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Redirect if not logged in (after checking)
  useEffect(() => {
    if (!loading && !autoLoginLoading && !user) {
      router.push('/login')
    }
  }, [loading, autoLoginLoading, user, router])

  if (loading || autoLoginLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto mb-4" />
          <p className="text-gray-600">Logging you in...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Standard Header - matches other dashboard pages */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Buy Credits
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Purchase credits to continue scraping
              </p>
            </div>
            <Link
              href="/dashboard/earn-credits"
              className="text-sm text-gray-600 hover:text-brand-500 transition-colors flex items-center gap-1.5"
            >
              <Gift className="w-4 h-4" />
              <span>Earn Free Credits</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Standard layout */}
      <div className="p-6 space-y-6">
        {/* Current Balance Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Current Balance</p>
              <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-500" />
                {billingStatus?.credits?.creditsRemaining ?? 0} credits
              </p>
              <p className="text-xs text-gray-500 mt-1">1 credit = 1 page scraped</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Need more?</p>
              <Link
                href="/dashboard/earn-credits"
                className="inline-flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-600 font-medium"
              >
                <Gift className="w-4 h-4" />
                Earn free credits
              </Link>
            </div>
          </div>
        </div>

        {/* Purchase Section - Prominent */}
        <div className="bg-gradient-to-br from-brand-500 to-magenta-500 rounded-xl border border-brand-400 p-8 shadow-lg">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Get 500 Credits</h2>
              <p className="text-brand-100">Only $10 - No subscription required</p>
            </div>
            <BuyCredits 
              variant="card" 
              onSuccess={() => {
                router.push('/dashboard')
              }}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What are credits?</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">•</span>
              <span><strong className="text-gray-900">1 credit = 1 page scraped</strong> - Each page you scrape uses 1 credit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">•</span>
              <span><strong className="text-gray-900">Credits never expire</strong> - Use them whenever you need</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">•</span>
              <span><strong className="text-gray-900">500 credits = 500 pages</strong> - Perfect for regular scraping needs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">•</span>
              <span><strong className="text-gray-900">Secure payment</strong> - Powered by Razorpay</span>
            </li>
          </ul>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How it works</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1 text-sm">Click Buy Credits</h3>
              <p className="text-xs text-gray-600">Choose the 500 credits pack</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1 text-sm">Complete Payment</h3>
              <p className="text-xs text-gray-600">Secure checkout via Razorpay</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1 text-sm">Start Scraping</h3>
              <p className="text-xs text-gray-600">Credits instantly added</p>
            </div>
          </div>
        </div>

        {/* Refund Request Section */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 mb-1">14-Day Money-Back Guarantee</h3>
              <p className="text-sm text-green-700 mb-3">
                Not satisfied with your purchase? No problem. Request a full refund within 14 days - no questions asked.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:ashwinsingh632@gmail.com?subject=Refund Request&body=Hi,%0A%0AI would like to request a refund for my recent credit purchase.%0A%0AAccount Email: [Your email]%0APurchase Date: [Date]%0AReason (optional): [Your reason]%0A%0AThank you."
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Request Refund
                </a>
                <Link
                  href="/refund-policy"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-green-300 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors"
                >
                  View Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

