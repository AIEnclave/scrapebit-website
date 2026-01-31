'use client'

import { useEffect } from 'react'
import { initSentry } from '../lib/sentry'
import { initAmplitude } from '../lib/amplitude'

export function AnalyticsInit() {
  useEffect(() => {
    initSentry()
    initAmplitude()
  }, [])

  return null
}

