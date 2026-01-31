'use client'

import { Settings as SettingsIcon, User, Zap, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useBilling } from '@/hooks/useBilling'
import Link from 'next/link'

export default function SettingsPage() {
  const { user } = useAuthStore()
  const { billingStatus } = useBilling()

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your preferences
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Account */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Account
          </h3>
          <div>
            <p className="text-sm text-gray-900">{user?.email}</p>
            <p className="text-xs text-gray-500">Signed in</p>
          </div>
        </div>

        {/* Credits & Billing */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Credits & Billing
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Credits Remaining</p>
                <p className="text-xs text-gray-500">
                  {billingStatus?.credits?.creditsRemaining ?? 0} credits available
                </p>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {billingStatus?.credits?.creditsRemaining ?? 0}
              </span>
            </div>
            <Link
              href="/dashboard/buy-credits"
              className="w-full bg-gradient-to-r from-brand-500 to-magenta-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Credits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-2">About</h3>
          <p className="text-sm text-gray-500">ScrapeBit v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">AI-powered web scraper</p>
        </div>
      </div>
    </div>
  )
}
