import { Suspense } from 'react'
import SupportContent from './SupportContent'
import PublicHeader from '@/components/PublicHeader'
import PublicFooter from '@/components/PublicFooter'

export const metadata = {
  title: 'Support - Scrapebit',
  description: 'Get help with Scrapebit. Contact our support team for any questions or issues.',
}

export default function SupportPage() {
  return (
    <div className="bg-white min-h-screen">
      <PublicHeader variant="light" currentPage="support" />
      <div className="pt-24">
        <Suspense fallback={<SupportLoading />}>
          <SupportContent />
        </Suspense>
      </div>
      <PublicFooter />
    </div>
  )
}

function SupportLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
}
