'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Save, Calendar, Settings, Plug, Search, Zap, LogOut, Crown, X, BarChart3, ExternalLink } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useBilling } from '@/hooks/useBilling'
import Link from 'next/link'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuthStore()
  const { billingStatus } = useBilling()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { id: 'saved', icon: Save, label: 'Saved Results', path: '/dashboard/saved' },
    { id: 'scheduled', icon: Calendar, label: 'Scheduled', path: '/dashboard/scheduled' },
    { id: 'integrations', icon: Plug, label: 'Integrations', path: '/dashboard/integrations' },
    { id: 'research', icon: Search, label: 'Deep Research', path: '/dashboard/research' },
    { id: 'buy-credits', icon: Zap, label: 'Buy Credits', path: '/dashboard/buy-credits' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ]

  const activeItem = menuItems.find(item => pathname?.startsWith(item.path))?.id || 'dashboard'

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-20 flex flex-col">
      {/* Header with ScrapeBit branding */}
      <div className="px-4 py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Scrapebit</h1>
            <p className="text-xs text-gray-400">AI Web Scraper</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer with Profile */}
      <div className="px-3 py-3 border-t border-gray-200" ref={profileRef}>
        {/* Profile Section */}
        <div className="relative mb-3">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isProfileOpen
                ? 'bg-brand-50 ring-2 ring-brand-500/30'
                : 'hover:bg-gray-50'
            }`}
          >
            {user?.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/50"
              />
            ) : (
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-brand-100 text-brand-600">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium truncate text-gray-900">
                {user?.name || 'User'}
              </p>
              <p className="text-xs truncate text-gray-400">
                {user?.email}
              </p>
            </div>
          </button>

          {/* Profile Dropdown - opens upward */}
          {isProfileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl shadow-xl z-50 bg-white border border-gray-200 animate-fadeIn">
              {/* Close button */}
              <button
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-2 right-2 p-1 rounded-lg transition-colors hover:bg-gray-100 text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Profile Header */}
              <div className="p-4 pb-3">
                <div className="flex items-center gap-3">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-brand-100 text-brand-600">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate text-gray-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs truncate text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Credits Section */}
              <div className="p-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Credits</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-bold text-gray-900">
                      {billingStatus?.credits?.creditsRemaining ?? 0}
                    </span>
                    <span className="text-xs text-gray-400">remaining</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 rounded-full overflow-hidden bg-gray-200">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-magenta-500 rounded-full transition-all"
                    style={{ 
                      width: `${Math.min(100, ((billingStatus?.credits?.creditsRemaining ?? 0) / (billingStatus?.credits?.creditsAllocated || 100)) * 100)}%` 
                    }}
                  />
                </div>
                
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-gray-400">
                    Used: {billingStatus?.credits?.creditsUsed ?? 0}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Total: {billingStatus?.credits?.creditsAllocated ?? 0}
                  </span>
                </div>
                
                {/* Buy Credits Button - Link to buy-credits page */}
                <div className="mt-3">
                  <Link
                    href="/dashboard/buy-credits"
                    className="w-full bg-gradient-to-r from-brand-500 to-magenta-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-xs"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Buy Credits</span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Plan Section */}
              <div className="p-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Plan</span>
                  <div className="flex items-center gap-1.5">
                    {billingStatus?.subscription ? (
                      <>
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-semibold capitalize text-amber-600">
                          {billingStatus.subscription.plan.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        Free
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200" />

              {/* Sign Out */}
              <div className="p-2">
                <button
                  onClick={() => {
                    setIsProfileOpen(false)
                    handleSignOut()
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left hover:bg-error-50 text-error-600 hover:text-error-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Version */}
        <p className="text-xs text-center text-gray-400">v1.0.0</p>
      </div>
    </div>
  )
}
