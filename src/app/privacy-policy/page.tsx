import type { Metadata } from 'next'
import Link from 'next/link'
import PublicHeader from '@/components/PublicHeader'
import PublicFooter from '@/components/PublicFooter'

export const metadata: Metadata = {
  title: 'Privacy Policy - Scrapebit',
  description: 'Privacy Policy for Scrapebit. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <PublicHeader variant="light" currentPage="privacy" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pt-28">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Effective Date: January 1, 2025</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            Scrapebit (the &quot;Company&quot;) is dedicated to protecting the privacy of its users. This Privacy Policy (&quot;Privacy Policy&quot;) is designed to explain how we collect, use, and safeguard the information you provide to us, and to help you make informed decisions when using our Service.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            For the purposes of this Privacy Policy:
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>&quot;Site&quot; refers to the Company&apos;s website, accessible at <Link href="/" className="text-purple-600 hover:text-purple-700">scrapebit.com</Link>.</li>
            <li>&quot;Service&quot; refers to the Company&apos;s services accessed via the Site, which allow users to build automations and execute workflows.</li>
            <li>The terms &quot;we,&quot; &quot;us,&quot; and &quot;our&quot; refer to the Company.</li>
            <li>&quot;You&quot; refers to you, as a user of our Site or Service.</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-6">
            By accessing our Site or Service, you agree to this Privacy Policy and our <Link href="/terms-of-service" className="text-purple-600 hover:text-purple-700">Terms of Use</Link>, and you consent to the collection, storage, use, and disclosure of your Personal Information as described in this Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">I. Information We Collect</h2>
          
          <p className="text-gray-600 leading-relaxed">
            We collect two types of information: &quot;Non-Personal Information&quot; and &quot;Personal Information.&quot;
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            <strong>Non-Personal Information</strong> includes data that cannot be used to personally identify you, such as anonymous usage data, general demographic information, referring/exit pages and URLs, platform types, preferences you submit, preferences generated based on your activity, and the number of clicks.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            <strong>Personal Information</strong> includes data that can identify you, such as your email address, password, device information, IP address, browser information, time zone, location, and website content (with your explicit permission).
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">1. Information Collected via Technology</h3>
          <p className="text-gray-600 leading-relaxed">
            To activate the Service, you only need to provide your email address. However, to fully use the Service, you may need to provide additional Personal Information, such as your name, job role, preferred time zone, location, and writing samples.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            We also collect certain information automatically, such as:
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>The website you visited before accessing our Site (the &quot;referring URL&quot;)</li>
            <li>The type of browser and device you use</li>
            <li>The time and date of your access</li>
            <li>Other data that does not personally identify you</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-4">
            We use cookies (small text files with a unique identifier) to collect this information. Cookies are sent to your browser and stored on your device. They help us track your preferences and improve your experience.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">2. Information You Provide by Registering for an Account</h3>
          <p className="text-gray-600 leading-relaxed">
            When you register for an account, you create a personal profile by providing your email address, username, and password. By registering, you authorize us to collect, store, and use this information in accordance with this Privacy Policy.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">3. Children&apos;s Privacy</h3>
          <p className="text-gray-600 leading-relaxed">
            Our Site and Service are not intended for individuals under the age of 13. We do not knowingly collect or solicit information from anyone under 13. If we discover that we have collected personal information from a child under 13 without parental consent, we will delete it promptly. If you believe we have collected such information, please contact us at <a href="mailto:ashwinsingh632@gmail.com" className="text-purple-600 hover:text-purple-700">ashwinsingh632@gmail.com</a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">II. How We Use and Share Information</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Personal Information</h3>
          <p className="text-gray-600 leading-relaxed">
            We do not sell, trade, or rent your Personal Information to third parties for marketing purposes without your consent. However, we may share your Personal Information with vendors who perform services for us, such as email communication providers. These vendors only use your information as directed by us and in accordance with this Privacy Policy.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            We use your Personal Information to:
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>Communicate with you (e.g., respond to questions, provide technical support, or share promotional offers).</li>
            <li>Improve our Service and user experience.</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-4">
            We may also share Personal Information if we believe in good faith that it is necessary to:
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>Comply with legal obligations or enforceable governmental requests.</li>
            <li>Enforce our Terms of Use, including investigating potential violations.</li>
            <li>Address fraud, security, or technical issues.</li>
            <li>Protect the rights, property, or safety of our users or the public.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Non-Personal Information</h3>
          <p className="text-gray-600 leading-relaxed">
            We use Non-Personal Information to improve the Service, analyze trends, and customize the user experience. We may share aggregated Non-Personal Information with partners, advertisers, and other third parties at our discretion.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">III. How We Protect Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We implement security measures to protect your information from unauthorized access. Your account is protected by your password, and we encourage you to keep it confidential and log out after each session.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            We also use technological safeguards, such as encryption, firewalls, and secure socket layer (SSL) technology. However, no security measures are foolproof, and we cannot guarantee the absolute security of your information. By using our Service, you acknowledge and accept these risks.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">IV. Your Rights Regarding Your Personal Information</h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to opt out of receiving marketing communications from us. To do so, you can:
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
            <li>Follow the unsubscribe instructions in our promotional emails.</li>
            <li>Adjust your preferences in the settings section of the Site.</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mt-4">
            Please note that even if you opt out of marketing communications, we may still send you administrative emails (e.g., updates to our Privacy Policy).
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Data Retention and Deletion</h3>
          <p className="text-gray-600 leading-relaxed">
            We retain your Personal Information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When the retention period expires, we will delete or destroy your data in a secure manner.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            You may request the deletion of your Personal Information by contacting us at <a href="mailto:ashwinsingh632@gmail.com" className="text-purple-600 hover:text-purple-700">ashwinsingh632@gmail.com</a>. We will delete your data unless we are legally required or permitted to retain it.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Data and Generative AI</h3>
          <p className="text-gray-600 leading-relaxed">
            We do not use your data (including API calls) to develop, improve, or train generative AI or machine learning models.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">V. Links to Other Websites</h2>
          <p className="text-gray-600 leading-relaxed">
            Our Site and Service may contain links to third-party websites or applications. We are not responsible for the privacy practices or content of these third parties. This Privacy Policy applies only to information collected by us. We encourage you to review the privacy policies of any third-party websites you visit.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">VI. Changes to Our Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to update this Privacy Policy at any time. Significant changes will be communicated via email or a prominent notice on our Site, and will take effect 30 days after notification. Non-material changes will take effect immediately.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">VII. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy or our practices, please contact us at:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <p className="text-gray-600">
              <strong>Scrapebit</strong><br />
              Email: <a href="mailto:ashwinsingh632@gmail.com" className="text-purple-600 hover:text-purple-700">ashwinsingh632@gmail.com</a>
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed mt-8">
            Thank you for trusting Scrapebit with your information.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: January 1, 2025
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/terms-of-service" className="text-sm text-purple-600 hover:text-purple-700">
              Terms of Service →
            </Link>
            <Link href="/refund-policy" className="text-sm text-purple-600 hover:text-purple-700">
              Refund Policy →
            </Link>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
