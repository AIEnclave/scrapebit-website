import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Scrapebit',
  description: 'Choose the perfect plan for your web scraping needs. Free tier available with powerful features.',
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out AI Scraper',
    features: [
      '6 pages / month',
      'Maximum 30 credits per page',
      'Data Export (CSV, JSON)',
      'Data Extraction Tools',
      '14 Days Data Retention',
      'Up to 5 Scrapers',
      '1 Scheduled Scraper',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Billed yearly. All credits upfront.',
    features: [
      '5,000 credits/year',
      'Everything in Free, plus:',
      'Subpage Scraping',
      'Pre-built Scraper Templates',
      'Bulk Scraping (2,000 URLs)',
      'Pagination (200 pages)',
      'Data Enrichment',
      '60 Days Data Retention',
      'Up to 30 Scrapers',
      'Up to 5 Scheduled Scrapers',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$16.50',
    originalPrice: '$24',
    period: '/month',
    description: 'Billed yearly. All credits upfront.',
    badge: 'Most Popular',
    discount: '31% off',
    features: [
      '30,000 credits/year',
      'Everything in Starter, plus:',
      'Unlimited Data Retention',
      'Unlimited Scrapers',
      'Up to 25 Scheduled Scrapers',
      'Minimum Monitor Frequency (5 mins)',
      'Priority Support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Business',
    price: 'Custom',
    period: '',
    description: 'Custom pricing and billing terms.',
    features: [
      'Custom Credits',
      'Custom Limits',
      'Priority Support',
      'Dedicated Account Management',
      'Custom Integrations',
      'SLA Guarantee',
      'Invoice Billing',
    ],
    cta: 'Contact Us',
    popular: false,
  },
]

const faqs = [
  {
    question: 'What is a Credit?',
    answer: 'A credit is used each time you scrape a page. Different actions consume different amounts of credits. Basic page scrapes typically use 1 credit, while AI-powered extractions may use more.',
  },
  {
    question: 'What is the difference between the Free and Starter plans?',
    answer: 'The Free plan offers basic scraping capabilities with limited pages per month. Starter unlocks advanced features like subpage scraping, bulk scraping, pagination support, and significantly more credits.',
  },
  {
    question: 'What happens if I exceed my monthly credits?',
    answer: 'You\'ll receive a notification when approaching your limit. You can upgrade your plan or wait for your credits to refresh at the start of your next billing cycle.',
  },
  {
    question: 'Can I switch between monthly and yearly plans?',
    answer: 'Yes, you can switch between billing cycles at any time. When switching to yearly, you\'ll receive a prorated discount. Yearly plans offer up to 20% savings.',
  },
  {
    question: 'What is included in the Free Trial?',
    answer: 'The free tier gives you access to core features with limited usage. No credit card required to start. You can upgrade anytime to unlock more features and higher limits.',
  },
  {
    question: 'What is the refund policy?',
    answer: 'We offer a 7-day refund policy for annual subscriptions if you\'re not satisfied. Monthly subscriptions can be cancelled anytime. See our Refund Policy for full details.',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Scrape Any Website in Just 2-Clicks
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              No CSS Selectors or Complex Drag-and-Drop. Start Automating Your Browser with AI Today.
            </p>
            
            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-sm font-medium text-gray-500">Monthly</span>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-purple-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
              </button>
              <span className="text-sm font-medium text-gray-900">
                Yearly <span className="text-green-600 font-semibold">Save 20%</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 -mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border ${
                  plan.popular
                    ? 'border-purple-500 shadow-xl shadow-purple-100'
                    : 'border-gray-200 shadow-sm'
                } p-6 flex flex-col`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                {plan.discount && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      {plan.discount}
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                
                <div className="mt-4 flex items-baseline">
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mr-2">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-gray-500">{plan.period}</span>
                </div>
                
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

                <ul className="mt-6 space-y-3 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-purple-500 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Business' ? 'mailto:ashwinsingh632@gmail.com' : '#'}
                  className={`mt-6 block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 shadow-md'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Compare Plans
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-gray-900">Free</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-gray-900">Starter</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-purple-600">Pro</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-gray-900">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: 'AI Web Scraper', free: true, starter: true, pro: true, business: true },
                  { feature: 'Subpage Scraping', free: false, starter: true, pro: true, business: true },
                  { feature: 'Pre-built Templates', free: false, starter: true, pro: true, business: true },
                  { feature: 'Bulk Scraping', free: false, starter: true, pro: true, business: true },
                  { feature: 'Max URLs per Bulk Scrape', free: '3', starter: '2,000', pro: '2,000', business: 'Custom' },
                  { feature: 'Pagination', free: false, starter: true, pro: true, business: true },
                  { feature: 'Max Paginated Pages', free: '3', starter: '200', pro: '200', business: 'Custom' },
                  { feature: 'Data Enrichment', free: false, starter: true, pro: true, business: true },
                  { feature: 'Data Retention', free: '14 Days', starter: '60 Days', pro: 'Unlimited', business: 'Custom' },
                  { feature: 'Max Scrapers', free: '5', starter: '30', pro: 'Unlimited', business: 'Custom' },
                  { feature: 'Max Scheduled Scrapers', free: '1', starter: '5', pro: '25', business: 'Custom' },
                  { feature: 'Data Export', free: true, starter: true, pro: true, business: true },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-4 px-4 text-sm text-gray-600">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <svg className="h-5 w-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{row.free}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <svg className="h-5 w-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center bg-purple-50">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <svg className="h-5 w-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-sm font-medium text-purple-600">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.business === 'boolean' ? (
                        row.business ? (
                          <svg className="h-5 w-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{row.business}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a
              href="mailto:ashwinsingh632@gmail.com"
              className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700"
            >
              Contact Us
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
