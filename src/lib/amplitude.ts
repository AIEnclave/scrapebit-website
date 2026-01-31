import * as amplitude from '@amplitude/analytics-browser'

let isInitialized = false

export function initAmplitude() {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
  const environment = process.env.NODE_ENV || 'development'

  if (!apiKey) {
    console.warn('⚠️  Amplitude API key not found. Analytics disabled.')
    return
  }

  if (isInitialized) {
    return
  }

  amplitude.init(apiKey, {
    defaultTracking: {
      pageViews: true,
      sessions: true,
      formInteractions: true,
      fileDownloads: true,
    },
    // Only track in production or if explicitly enabled
    optOut: environment !== 'production' && !process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED,
  })

  isInitialized = true
  console.log('✅ Amplitude initialized for frontend')
}

export function trackEvent(eventName: string, eventProperties?: Record<string, any>) {
  if (!isInitialized) {
    initAmplitude()
  }
  
  amplitude.track(eventName, eventProperties)
}

export function setUser(userId: string, userProperties?: Record<string, any>) {
  if (!isInitialized) {
    initAmplitude()
  }
  
  amplitude.setUserId(userId)
  if (userProperties) {
    amplitude.identify(new amplitude.Identify().set(userProperties))
  }
}

export function resetUser() {
  if (isInitialized) {
    amplitude.reset()
  }
}

export default amplitude

