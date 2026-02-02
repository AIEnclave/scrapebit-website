'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface CrispChatProps {
  websiteId: string
  // Optional: Pass user info when logged in
  user?: {
    email?: string
    name?: string
    userId?: string
  }
}

export default function CrispChat({ websiteId, user }: CrispChatProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize Crisp
    window.$crisp = []
    window.CRISP_WEBSITE_ID = websiteId

    // Load Crisp script
    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [websiteId])

  // Update user info when it changes (e.g., after login)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$crisp && user) {
      // Set user email
      if (user.email) {
        window.$crisp.push(['set', 'user:email', user.email])
      }
      // Set user name (nickname in Crisp)
      if (user.name) {
        window.$crisp.push(['set', 'user:nickname', user.name])
      }
      // Set custom data
      if (user.userId) {
        window.$crisp.push(['set', 'session:data', [[
          ['user_id', user.userId],
          ['plan', 'free'], // You can pass actual plan here
        ]]])
      }
    }
  }, [user])

  // Track page changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$crisp) {
      // Optionally track page views in Crisp
      window.$crisp.push(['set', 'session:data', [['current_page', pathname]]])
    }
  }, [pathname])

  return null // This component doesn't render anything visible
}
