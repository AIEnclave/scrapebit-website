'use client'

import { useState } from 'react'
import { Chrome, Download, RefreshCw, CheckCircle2, ArrowRight, Puzzle } from 'lucide-react'
import Link from 'next/link'

interface ExtensionRequiredProps {
  onRetryCheck: () => void
}

export default function ExtensionRequired({ onRetryCheck }: ExtensionRequiredProps) {
  const [isChecking, setIsChecking] = useState(false)

  const handleRetry = () => {
    setIsChecking(true)
    // Give time for extension to be detected after install
    setTimeout(() => {
      onRetryCheck()
      setIsChecking(false)
    }, 1000)
  }

  const chromeStoreUrl = 'https://chromewebstore.google.com/detail/scrapebit' // Update with actual URL

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-6 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Puzzle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Extension Required
            </h1>
            <p className="text-purple-100">
              Install the Scrapebit extension to get started
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-gray-600 text-center mb-8">
              To use Scrapebit, you need our Chrome extension. It&apos;s free and takes just a few seconds to install.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-purple-600">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Install the extension</h3>
                  <p className="text-sm text-gray-500">Click the button below to open Chrome Web Store</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-purple-600">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Click &quot;Add to Chrome&quot;</h3>
                  <p className="text-sm text-gray-500">Confirm the installation in the popup</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-purple-600">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Return here and refresh</h3>
                  <p className="text-sm text-gray-500">Click the button below to verify installation</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={chromeStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl group"
              >
                <Chrome className="w-5 h-5" />
                Install Chrome Extension
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleRetry}
                disabled={isChecking}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    I&apos;ve installed it - Check again
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-6 bg-white/60 backdrop-blur rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">What you&apos;ll get:</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', text: 'Point & click scraping' },
              { icon: '🤖', text: 'AI data extraction' },
              { icon: '📊', text: 'Export to CSV/Sheets' },
              { icon: '🔄', text: 'Auto-pagination' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <span>{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Help Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Having trouble?{' '}
          <Link href="/support" className="text-purple-600 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
