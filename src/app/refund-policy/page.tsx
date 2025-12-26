import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy - Scrapebit',
  description: 'Refund Policy for Scrapebit subscriptions and payments.',
}

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-500">Effective Date: January 1, 2025</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            At Scrapebit (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we want you to be completely satisfied with your purchase. This Refund Policy outlines the terms under which refunds are provided for our subscription services.
          </p>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 my-8">
            <p className="text-green-800">
              <strong>14-Day Money-Back Guarantee:</strong> If you are not satisfied with your purchase for any reason, you may request a full refund within 14 days of your purchase date. No questions asked.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Refund Eligibility</h2>
          <p className="text-gray-600 leading-relaxed">
            All paid subscriptions (monthly and annual) are eligible for a full refund within 14 days of the original purchase date.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>You may request a refund within 14 days of your initial purchase.</li>
            <li>Refunds apply to both monthly and annual subscription plans.</li>
            <li>The 14-day period begins on the date of your purchase.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. How to Request a Refund</h2>
          <p className="text-gray-600 leading-relaxed">
            To request a refund, please contact us:
          </p>
          <ol className="list-decimal pl-6 mt-4 space-y-2 text-gray-600">
            <li>Send an email to <a href="mailto:ashwinsingh632@gmail.com" className="text-purple-600 hover:text-purple-700">ashwinsingh632@gmail.com</a> with the subject line &quot;Refund Request.&quot;</li>
            <li>Include your account email address and order details.</li>
          </ol>

          <p className="text-gray-600 leading-relaxed mt-4">
            We will process your refund request promptly. Refunds will be issued to the original payment method within 5-10 business days.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Subscription Cancellation</h2>
          <p className="text-gray-600 leading-relaxed">
            You may cancel your subscription at any time:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>If you cancel within the 14-day refund window, you will receive a full refund.</li>
            <li>If you cancel after the 14-day window, you will retain access to the service until the end of your current billing period, but no refund will be issued.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Free Tier</h2>
          <p className="text-gray-600 leading-relaxed">
            Our Free tier is provided at no cost. As no payment is required, no refunds are applicable to the Free tier.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to modify this Refund Policy at any time. Changes will be effective upon posting to our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Contact Information</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Refund Policy, please contact us:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <p className="text-gray-600">
              <strong>Scrapebit</strong><br />
              Email: <a href="mailto:ashwinsingh632@gmail.com" className="text-purple-600 hover:text-purple-700">ashwinsingh632@gmail.com</a>
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Summary</h3>
            <ul className="list-disc pl-6 space-y-1 text-blue-700 text-sm">
              <li><strong>All paid plans:</strong> Full refund within 14 days of purchase</li>
              <li><strong>No questions asked:</strong> Request a refund for any reason</li>
              <li><strong>Refund processing:</strong> 5-10 business days</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: January 1, 2025
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/terms-of-service" className="text-sm text-purple-600 hover:text-purple-700">
              Terms of Service →
            </Link>
            <Link href="/privacy-policy" className="text-sm text-purple-600 hover:text-purple-700">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
