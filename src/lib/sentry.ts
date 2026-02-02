import * as Sentry from '@sentry/nextjs'

export function initSentry() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN
  const environment = process.env.NODE_ENV || 'development'

  if (!dsn) {
    console.warn('⚠️  Sentry DSN not found. Error tracking disabled.')
    return
  }

  Sentry.init({
    dsn,
    environment,
    // Performance Monitoring
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
    // Unhandled rejections are captured by default in modern Sentry
    beforeSend(event, hint) {
      // Filter out sensitive data
      if (event.request) {
        // Remove sensitive headers
        if (event.request.headers) {
          delete event.request.headers['authorization']
          delete event.request.headers['cookie']
        }
        // Remove sensitive query params
        if (event.request.query_string) {
          const params = new URLSearchParams(event.request.query_string)
          params.delete('token')
          params.delete('apiKey')
          event.request.query_string = params.toString()
        }
      }
      return event
    },
  })

  console.log('✅ Sentry initialized for frontend')
}

export default Sentry

