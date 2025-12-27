'use client'

import { useSearchParams } from 'next/navigation'
import { MessageCircle, Mail, Clock, Zap, HelpCircle, BookOpen } from 'lucide-react'
import HubSpotChat from '@/components/HubSpotChat'

// TODO: Replace with your actual HubSpot Portal ID
const HUBSPOT_PORTAL_ID = 'YOUR_HUBSPOT_PORTAL_ID'

export default function SupportContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || undefined

  const faqs = [
    {
      question: 'How do I extract data from a website?',
      answer: 'Simply navigate to any website, click the Scrapebit extension icon, and either use auto-extract or describe what data you want in plain English.',
    },
    {
      question: 'How many credits do I get?',
      answer: 'Free users get 50 credits per month. Each scrape costs approximately 1-5 credits depending on the complexity. Upgrade to get more credits.',
    },
    {
      question: 'Can I export data to Google Sheets?',
      answer: 'Yes! After extracting data, click "Export to Google Sheets" to automatically create a spreadsheet with your data.',
    },
    {
      question: 'What websites can I scrape?',
      answer: 'Scrapebit works on most public websites. Some sites with heavy JavaScript or anti-bot protection may have limited functionality.',
    },
    {
      question: 'How do scheduled scrapes work?',
      answer: 'You can schedule scrapes to run automatically at specific times. Great for monitoring prices, tracking changes, or collecting data regularly.',
    },
  ]

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 mb-6">
            <HelpCircle className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How can we help?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get support for Scrapebit. Our team is here to help you extract data effortlessly.
          </p>
          {email && (
            <p className="mt-4 text-sm text-purple-600 bg-purple-50 inline-block px-4 py-2 rounded-full">
              <Mail className="w-4 h-4 inline mr-2" />
              Logged in as {email}
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">
              Chat with our support team in real-time. We typically respond within minutes.
            </p>
            <button 
              onClick={() => window.HubSpotConversations?.widget.open()}
              className="text-purple-600 font-medium text-sm hover:text-purple-700"
            >
              Start Chat →
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Send us an email and we&apos;ll get back to you within 24 hours.
            </p>
            <a 
              href="mailto:support@scrapebit.com"
              className="text-purple-600 font-medium text-sm hover:text-purple-700"
            >
              support@scrapebit.com →
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600 text-sm mb-4">
              Browse our guides and tutorials to learn how to use Scrapebit.
            </p>
            <a 
              href="/docs"
              className="text-purple-600 font-medium text-sm hover:text-purple-700"
            >
              View Docs →
            </a>
          </div>
        </div>
      </div>

      {/* Response Time Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <Clock className="w-10 h-10 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Fast Response Times</h3>
                <p className="text-purple-100">We aim to respond to all inquiries within 2 hours during business hours.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Avg. response: 30 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className="text-purple-600 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* HubSpot Chat Widget */}
      <HubSpotChat portalId={HUBSPOT_PORTAL_ID} email={email} />
    </div>
  )
}
