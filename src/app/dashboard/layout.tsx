'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import DashboardSidebar from '@/components/DashboardSidebar'
import ExtensionRequired from '@/components/ExtensionRequired'
import { useExtensionDetector } from '@/hooks/useExtensionDetector'
import { Loader2 } from 'lucide-react'

// Set user info in Crisp when logged in
function useCrispUser(user: { id: string; email: string; name?: string } | null) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$crisp && user) {
      window.$crisp.push(['set', 'user:email', user.email])
      if (user.name) {
        window.$crisp.push(['set', 'user:nickname', user.name])
      }
      window.$crisp.push(['set', 'session:data', [[
        ['user_id', user.id],
      ]]])
    }
  }, [user])
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, checkAuth } = useAuthStore()
  const extensionStatus = useExtensionDetector()

  // Set Crisp user info when logged in
  useCrispUser(user)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Handle retry check for extension
  const handleRetryExtensionCheck = useCallback(() => {
    // Force a page reload to re-run extension detection
    window.location.reload()
  }, [])

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return null
  }

  // Show loading while checking extension
  if (extensionStatus.isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
        <p className="text-gray-500 text-sm">Checking for extension...</p>
      </div>
    )
  }

  // Block dashboard if extension not installed
  if (!extensionStatus.isInstalled) {
    return <ExtensionRequired onRetryCheck={handleRetryExtensionCheck} />
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 ml-64 h-screen overflow-hidden">
        {children}
      </div>
    </div>
  )
}
