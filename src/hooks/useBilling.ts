import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface BillingStatus {
  credits: {
    creditsRemaining: number
    creditsUsed: number
    creditsAllocated: number
  }
  subscription?: {
    plan: {
      name: string
    }
  }
}

export function useBilling() {
  const [billingStatus, setBillingStatus] = useState<BillingStatus | null>(null)
  const [creditsRemaining, setCreditsRemaining] = useState(0)
  const [loading, setLoading] = useState(true)
  const [canSchedule, setCanSchedule] = useState(false)

  useEffect(() => {
    fetchBillingStatus()
  }, [])

  const fetchBillingStatus = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setLoading(false)
        return
      }

      const response = await fetch('http://localhost:3000/api/billing/status', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Billing status response:', data)
        console.log('Credits object:', data.credits)
        console.log('Credits remaining:', data.credits?.creditsRemaining)
        setBillingStatus(data)
        setCreditsRemaining(data.credits?.creditsRemaining || 0)
        setCanSchedule(data.subscription ? true : false)
      } else {
        const errorText = await response.text()
        console.error('Billing status error:', response.status, errorText)
      }
    } catch (error) {
      console.error('Failed to fetch billing status:', error)
    } finally {
      setLoading(false)
    }
  }

  return { billingStatus, creditsRemaining, loading, canSchedule, refetch: fetchBillingStatus }
}

