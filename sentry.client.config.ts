import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  // Unhandled rejections are captured by default in modern Sentry
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      if (event.request.headers) {
        delete event.request.headers['authorization']
        delete event.request.headers['cookie']
      }
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

