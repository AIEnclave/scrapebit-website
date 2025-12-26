import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy - AI Scraper',
  description: 'Refund Policy for AI Scraper subscriptions and payments.',
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
            At AI Scraper Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we strive to ensure customer satisfaction with our services. This Refund Policy outlines the terms and conditions under which refunds may be granted for our subscription services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Free Tier</h2>
          <p className="text-gray-600 leading-relaxed">
            Our Free tier is provided at no cost. As no payment is required, no refunds are applicable to the Free tier.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Paid Subscriptions</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Monthly Subscriptions</h3>
          <p className="text-gray-600 leading-relaxed">
            Monthly subscriptions are billed on a recurring monthly basis. Due to the nature of our service:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>Monthly subscription fees are <strong>non-refundable</strong> once the billing cycle has begun.</li>
            <li>You may cancel your subscription at any time, and you will retain access to the service until the end of your current billing period.</li>
            <li>No partial refunds will be issued for unused portions of a monthly subscription.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Annual Subscriptions</h3>
          <p className="text-gray-600 leading-relaxed">
            Annual subscriptions are billed upfront for a full year. We offer the following refund terms:
          </p>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
            <p className="text-green-800">
              <strong>7-Day Refund Window:</strong> If you are not satisfied with your annual subscription, you may request a full refund within 7 days of your initial purchase date.
            </p>
          </div>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>After the 7-day window, annual subscription fees are <strong>non-refundable</strong>.</li>
            <li>If you cancel after 7 days, you will retain access to the service until the end of your annual billing period.</li>
            <li>No partial refunds will be issued for unused portions of an annual subscription after the 7-day refund window.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Refund Eligibility</h2>
          <p className="text-gray-600 leading-relaxed">
            To be eligible for a refund, you must meet the following criteria:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>The refund request must be submitted within the applicable refund window (7 days for annual subscriptions).</li>
            <li>Your account must be in good standing (not suspended or terminated for violation of our Terms of Service).</li>
            <li>You have not previously received a refund for the same subscription.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. How to Request a Refund</h2>
          <p className="text-gray-600 leading-relaxed">
            To request a refund, please follow these steps:
          </p>
          <ol className="list-decimal pl-6 mt-4 space-y-2 text-gray-600">
            <li>Send an email to <a href="mailto:billing@example.com" className="text-purple-600 hover:text-purple-700">billing@example.com</a> with the subject line &quot;Refund Request.&quot;</li>
            <li>Include your account email address and the reason for your refund request.</li>
            <li>Provide any relevant order or transaction details.</li>
          </ol>

          <p className="text-gray-600 leading-relaxed mt-4">
            We will review your request and respond within 5 business days. If approved, refunds will be processed to the original payment method within 5-10 business days.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Exceptions</h2>
          <p className="text-gray-600 leading-relaxed">
            Refunds will not be granted in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>Requests made after the applicable refund window has expired.</li>
            <li>Accounts terminated due to violation of our Terms of Service or Acceptable Use Policy.</li>
            <li>Credits or promotional offers that were applied to your subscription.</li>
            <li>Chargebacks initiated with your payment provider before contacting us.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Credit Consumption</h2>
          <p className="text-gray-600 leading-relaxed">
            Please note that credits consumed during your subscription period are non-refundable. If you request a refund:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>Credits already used will be deducted from the refund amount at their prorated value.</li>
            <li>If significant credits have been consumed, the refund amount may be reduced accordingly.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Cancellation vs. Refund</h2>
          <p className="text-gray-600 leading-relaxed">
            Canceling your subscription and requesting a refund are separate processes:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li><strong>Cancellation:</strong> Stops future billing but allows you to use the service until the end of your current period.</li>
            <li><strong>Refund:</strong> Returns payment to you but immediately terminates your access to paid features.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to modify this Refund Policy at any time. Changes will be effective upon posting to our website. Continued use of our services after changes constitutes acceptance of the modified policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. Contact Information</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Refund Policy, please contact us:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <p className="text-gray-600">
              <strong>AI Scraper Inc.</strong><br />
              Address: 548 Market St. Suite 41440<br />
              San Francisco, California 94104<br />
              Billing Email: <a href="mailto:billing@example.com" className="text-purple-600 hover:text-purple-700">billing@example.com</a><br />
              General Email: <a href="mailto:contact@example.com" className="text-purple-600 hover:text-purple-700">contact@example.com</a>
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Summary</h3>
            <ul className="list-disc pl-6 space-y-1 text-blue-700 text-sm">
              <li><strong>Monthly subscriptions:</strong> Non-refundable, cancel anytime</li>
              <li><strong>Annual subscriptions:</strong> Full refund within 7 days of purchase</li>
              <li><strong>Credits used:</strong> May reduce refund amount</li>
              <li><strong>Refund processing:</strong> 5-10 business days after approval</li>
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
