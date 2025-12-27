import { Suspense } from 'react'
import SupportContent from './SupportContent'

export const metadata = {
  title: 'Support - Scrapebit',
  description: 'Get help with Scrapebit. Contact our support team for any questions or issues.',
}

export default function SupportPage() {
  return (
    <Suspense fallback={<SupportLoading />}>
      <SupportContent />
    </Suspense>
  )
}

function SupportLoading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
}
