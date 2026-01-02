'use client'

import { Settings as SettingsIcon, User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export default function SettingsPage() {
  const { user } = useAuthStore()

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
