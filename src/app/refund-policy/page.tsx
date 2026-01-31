import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy - Scrapebit',
  description: 'Refund Policy for Scrapebit credit purchases.',
}

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-500">Effective Date: January 1, 2025</p>
        </div>

        {/* Prominent Refund Request CTA */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">14-Day Money-Back Guarantee</h2>
            <p className="text-green-700 mb-6 max-w-lg mx-auto">
              Not satisfied with your purchase? No problem! Request a full refund within 14 days of your purchase. No questions asked.
            </p>
            <a
              href="mailto:ashwinsingh632@gmail.com?subject=Refund Request&body=Hi,%0A%0AI would like to request a refund for my recent credit purchase.%0A%0AAccount Email: [Your email]%0APurchase Date: [Date]%0AReason (optional): [Your reason]%0A%0AThank you."
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request Refund via Email
            </a>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            At Scrapebit (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we want you to be completely satisfied with your purchase. This Refund Policy outlines the terms under which refunds are provided for credit purchases.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Refund Eligibility</h2>
          <p className="text-gray-600 leading-relaxed">
            All credit purchases are eligible for a full refund within 14 days of the original purchase date.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>You may request a refund within 14 days of your purchase.</li>
            <li>The 14-day period begins on the date of your purchase.</li>
            <li>Refunds are processed regardless of how many credits you have used.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. How to Request a Refund</h2>
          <p className="text-gray-600 leading-relaxed">
            To request a refund, simply send us an email:
          </p>
          <ol className="list-decimal pl-6 mt-4 space-y-2 text-gray-600">
            <li>Send an email to <a href="mailto:ashwinsingh632@gmail.com" className="text-purple-600 hover:text-purple-700 font-medium">ashwinsingh632@gmail.com</a> with the subject line &quot;Refund Request&quot;</li>
            <li>Include your account email address</li>
            <li>Mention your purchase date (optional but helpful)</li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-8">
            <p className="text-blue-800">
              <strong>Processing Time:</strong> We aim to process all refund requests within 2-3 business days. Refunds will be issued to your original payment method within 5-10 business days depending on your bank.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. What Happens After Refund</h2>
          <p className="text-gray-600 leading-relaxed">
            Once your refund is processed:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>The purchased credits will be removed from your account</li>
            <li>You will retain access to the free tier features</li>
            <li>You can purchase credits again at any time</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Free Credits</h2>
          <p className="text-gray-600 leading-relaxed">
            Free credits (including signup bonuses, referral rewards, and earned credits) are provided at no cost and are not eligible for refunds or cash conversion.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to modify this Refund Policy at any time. Changes will be effective upon posting to our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Contact Information</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Refund Policy or need assistance with a refund, please contact us:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <p className="text-gray-600">
              <strong>Scrapebit</strong><br />
              Email: <a href="mailto:ashwinsingh632@gmail.com" className="text-purple-600 hover:text-purple-700">ashwinsingh632@gmail.com</a>
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Summary</h3>
            <ul className="list-disc pl-6 space-y-1 text-green-700 text-sm">
              <li><strong>All credit purchases:</strong> Full refund within 14 days</li>
              <li><strong>No questions asked:</strong> Request a refund for any reason</li>
              <li><strong>Easy process:</strong> Just send us an email</li>
              <li><strong>Quick processing:</strong> 2-3 business days</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: January 1, 2025
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/terms-of-service" className="text-sm text-purple-600 hover:text-purple-700">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-sm text-purple-600 hover:text-purple-700">
              Privacy Policy
            </Link>
            <Link href="/pricing" className="text-sm text-purple-600 hover:text-purple-700">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
