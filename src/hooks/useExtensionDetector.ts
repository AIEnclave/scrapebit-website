'use client'

import { useState, useEffect, useCallback } from 'react'

interface ExtensionStatus {
  isInstalled: boolean
  isChecking: boolean
  version?: string
}

/**
 * Hook to detect if the Scrapebit Chrome extension is installed.
 *
 * The extension should set one of these to indicate it's installed:
 * 1. window.__SCRAPEBIT_EXTENSION__ object with version info
 * 2. A DOM element with id="scrapebit-extension-marker"
 * 3. Respond to a custom event "scrapebit:ping" with "scrapebit:pong"
 */
export function useExtensionDetector(): ExtensionStatus {
  const [status, setStatus] = useState<ExtensionStatus>({
    isInstalled: false,
    isChecking: true,
  })

  const checkExtension = useCallback(() => {
    // Method 1: Check for global variable (most reliable)
    if (typeof window !== 'undefined' && (window as any).__SCRAPEBIT_EXTENSION__) {
      const ext = (window as any).__SCRAPEBIT_EXTENSION__
      setStatus({
        isInstalled: true,
        isChecking: false,
        version: ext.version || 'unknown',
      })
      return true
    }

    // Method 2: Check for DOM marker element
    if (typeof document !== 'undefined') {
      const marker = document.getElementById('scrapebit-extension-marker')
      if (marker) {
        setStatus({
          isInstalled: true,
          isChecking: false,
          version: marker.getAttribute('data-version') || 'unknown',
        })
        return true
      }
    }

    return false
  }, [])

  useEffect(() => {
    // Initial check
    if (checkExtension()) return

    // Method 3: Send ping event and wait for pong response
    const handlePong = (event: CustomEvent) => {
      setStatus({
        isInstalled: true,
        isChecking: false,
        version: event.detail?.version || 'unknown',
      })
    }

    window.addEventListener('scrapebit:pong', handlePong as EventListener)

    // Dispatch ping event for extension to respond
    window.dispatchEvent(new CustomEvent('scrapebit:ping'))

    // Give the extension time to respond, then check again
    const timeout1 = setTimeout(() => {
      if (checkExtension()) return
    }, 100)

    // Final check after a longer delay
    const timeout2 = setTimeout(() => {
      if (!checkExtension()) {
        setStatus({
          isInstalled: false,
          isChecking: false,
        })
      }
    }, 500)

    return () => {
      window.removeEventListener('scrapebit:pong', handlePong as EventListener)
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [checkExtension])

  return status
}

/**
 * For development/testing: simulate extension being installed
 */
export function simulateExtensionInstalled(version = '1.0.0') {
  if (typeof window !== 'undefined') {
    (window as any).__SCRAPEBIT_EXTENSION__ = { version, installed: true }
  }
}
