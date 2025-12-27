'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// Add HubSpot types to window
declare global {
  interface Window {
    HubSpotConversations?: {
      widget: {
        load: () => void
        open: () => void
        close: () => void
        remove: () => void
        refresh: () => void
      }
    }
    hsConversationsSettings?: {
      loadImmediately?: boolean
      identificationEmail?: string
      identificationToken?: string
    }
    hsConversationsOnReady?: Array<() => void>
  }
}

interface HubSpotChatProps {
  portalId: string  // Your HubSpot portal ID
  email?: string    // Pre-fill visitor email if known
}

export default function HubSpotChat({ portalId, email }: HubSpotChatProps) {
  const searchParams = useSearchParams()
  
  // Get email from props or URL params
  const visitorEmail = email || searchParams.get('email') || undefined

  useEffect(() => {
    // Configure HubSpot before loading
    window.hsConversationsSettings = {
      loadImmediately: true,
    }
    
    // If we have an email, identify the visitor
    if (visitorEmail) {
      window.hsConversationsSettings.identificationEmail = visitorEmail
    }

    // Load HubSpot script
    const script = document.createElement('script')
    script.src = `//js.hs-scripts.com/${portalId}.js`
    script.async = true
    script.defer = true
    script.id = 'hs-script-loader'
    
    // On script load, open the chat widget automatically if email is provided
    script.onload = () => {
      if (visitorEmail && window.HubSpotConversations) {
        // Small delay to ensure widget is ready
        setTimeout(() => {
          window.HubSpotConversations?.widget.open()
        }, 1000)
      }
    }
    
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById('hs-script-loader')
      if (existingScript) {
        existingScript.remove()
      }
      // Remove the chat widget
      if (window.HubSpotConversations) {
        window.HubSpotConversations.widget.remove()
      }
    }
  }, [portalId, visitorEmail])

  return null // This component doesn't render anything visible
}
