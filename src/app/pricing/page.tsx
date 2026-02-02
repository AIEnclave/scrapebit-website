'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import BuyCredits from '@/components/BuyCredits'
import PublicHeader from '@/components/PublicHeader'
import PublicFooter from '@/components/PublicFooter'
import { Zap, Check, HelpCircle, Mail, Shield, Clock, Download, Globe, Sparkles, RotateCcw, ArrowRight, Search, Bell, MessageSquare, Calendar } from 'lucide-react'

const creditPack = {
  credits: 500,
  price: 10,
  perCredit: 0.02,
  description: 'Perfect for getting started',
}

const premiumFeatures = [
  {
    icon: Sparkles,
    title: 'AI-Powered Extraction',
    description: 'Natural language commands to extract exactly what you need. No CSS selectors required.',
    gradient: 'from-brand-500 to-brand-600',
  },
  {
    icon: Calendar,
    title: 'Scheduled Scraping',
    description: 'Set up recurring scrapes - hourly, daily, or weekly. Automatically collect fresh data.',
    gradient: 'from-accent-500 to-accent-600',
  },
  {
    icon: Bell,
    title: 'Page Monitoring',
    description: 'Monitor websites for changes and get notified instantly when content updates.',
    gradient: 'from-warning-500 to-warning-400',
  },
  {
    icon: Search,
    title: 'Deep Research',
    description: 'Let AI research topics across multiple sources and compile comprehensive reports.',
    gradient: 'from-success-500 to-success-400',
  },
  {
    icon: MessageSquare,
    title: 'Talk with Your Data',
    description: 'Ask questions about your scraped data in natural language. Get instant insights.',
    gradient: 'from-magenta-500 to-magenta-600',
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    description: 'One-click export to Google Sheets, Notion, Airtable, or download as CSV/JSON.',
    gradient: 'from-cyan-500 to-cyan-600',
  },
]

const faqs = [
  {
    question: 'What is a Credit?',
    answer: 'A credit is used each time you scrape a page. 1 credit = 1 page scraped. Simple and straightforward.',
  },
  {
    question: 'Do credits expire?',
    answer: 'No! Credits you purchase never expire. Use them whenever you need.',
  },
  {
    question: 'What can I do with credits?',
    answer: 'Credits unlock all features including AI extraction, exports to Google Sheets/Notion, scheduled scrapes, webhooks, and more.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.',
  },
  {
    question: 'What is the refund policy?',
    answer: 'We offer a 14-day money-back guarantee. If you\'re not satisfied, email us for a full refund. No questions asked.',
  },
  {
    question: 'Do you offer subscriptions?',
    answer: 'Currently we offer pay-per-use credit packs only. This gives you more flexibility - buy credits when you need them, no recurring charges.',
  },
]

// Scroll-animated section wrapper
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* CSS for custom animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <PublicHeader variant="dark" currentPage="pricing" />

      {/* Dark Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 bg-brand-950">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 via-brand-950 to-brand-950" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-accent-500/20 rounded-full blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-sm text-brand-300 mb-6">
              <Zap className="w-4 h-4" />
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white">Pay Only For</span>
              <br />
              <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-brand-400 bg-clip-text text-transparent">
                What You Use
              </span>
            </h1>
            <p className="mt-6 text-lg text-grayblue-400 max-w-2xl mx-auto">
              No subscriptions, no monthly fees, no surprises. Buy credits when you need them, use them whenever you want.
            </p>
          </div>
        </div>

        {/* Transition wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 74.7C120 69 240 59 360 53.3C480 48 600 48 720 53.3C840 59 960 69 1080 69.3C1200 69 1320 59 1380 53.3L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Light Credit Pack Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Single Credit Pack */}
          <div className="max-w-md mx-auto mb-16">
            <AnimatedSection>
              <div className="relative rounded-2xl p-8 bg-gradient-to-br from-brand-600 to-magenta-600 shadow-xl shadow-brand-500/20 text-white">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-amber-900 shadow-lg">
                    Starter Pack
                  </span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4 text-white/80">
                    <Zap className="w-6 h-6 text-amber-300" />
                    <span className="text-lg font-medium">{creditPack.credits.toLocaleString()} Credits</span>
                  </div>

                  <div className="mb-2">
                    <span className="text-5xl font-bold text-white">${creditPack.price}</span>
                  </div>

                  <p className="text-sm mb-2 text-brand-100">
                    ${creditPack.perCredit.toFixed(2)} per credit
                  </p>

                  <p className="text-brand-100 mb-6">
                    {creditPack.description}
                  </p>

                  <div className="mt-6">
                    <BuyCredits variant="card" onSuccess={() => window.location.reload()} />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Value Proposition */}
          <AnimatedSection>
            <div className="bg-gradient-to-br from-grayblue-50 to-brand-50 border border-grayblue-200 rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-xl font-bold text-title mb-6">Why Pay-Per-Use?</h3>
              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mb-3">
                    <Check className="w-6 h-6 text-success-500" />
                  </div>
                  <h4 className="font-semibold text-title mb-1">No Subscriptions</h4>
                  <p className="text-sm text-body">No recurring fees, cancel anytime</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="font-semibold text-title mb-1">Never Expires</h4>
                  <p className="text-sm text-body">Use credits at your own pace</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6 text-brand-600" />
                  </div>
                  <h4 className="font-semibold text-title mb-1">All Features</h4>
                  <p className="text-sm text-body">Full access with any credit pack</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Light Premium Features Section */}
      <section className="py-16 bg-grayblue-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 border border-brand-200 text-sm text-brand-700 mb-4">
              <Sparkles className="w-4 h-4" />
              Premium Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-title">
              Everything Unlocked with Credits
            </h2>
            <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
              No feature gates, no premium tiers. Every credit gives you access to all our powerful features.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="group p-6 rounded-2xl bg-white border border-grayblue-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-title mb-1 group-hover:text-brand-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-body">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Additional Features List */}
          <AnimatedSection className="mt-8">
            <div className="bg-white border border-grayblue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-title mb-4 text-center">Also Included</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Pre-built scrapers',
                  'Webhook integration',
                  'Google Sheets sync',
                  'Auto-pagination',
                  'Subpage scraping',
                  'PDF generation',
                  'Chrome extension',
                  'API access',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success-500 flex-shrink-0" />
                    <span className="text-sm text-title">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How Credits Work */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-title">How Credits Work</h2>
            <p className="mt-4 text-body">Simple math, no hidden costs</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: '1 Credit = 1 Page',
                description: 'Each page you scrape uses exactly 1 credit. Simple and predictable.',
              },
              {
                icon: '♾️',
                title: 'Never Expire',
                description: 'Your credits are yours forever. Use them at your own pace, no rush.',
              },
              {
                icon: '🔓',
                title: 'All Features',
                description: 'Every feature is included. No premium tiers or upsells.',
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-grayblue-100 border border-grayblue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="font-semibold text-title mb-2">{item.title}</h3>
                  <p className="text-sm text-body">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-grayblue-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl font-bold text-title">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div className="bg-white border border-grayblue-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-md transition-all">
                  <h3 className="text-base font-semibold text-title mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-body pl-7 text-sm">{faq.answer}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-8 text-center">
            <p className="text-body mb-4">Still have questions?</p>
            <a
              href="mailto:ashwinsingh632@gmail.com"
              className="inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Refund Policy Banner */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-success-100 to-emerald-50 border-2 border-success-400 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-success-100 border border-success-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-8 h-8 text-success-500" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-xl font-bold text-success-500 mb-2">14-Day Money-Back Guarantee</h3>
                  <p className="text-body">
                    Not satisfied with your purchase? No problem. Request a full refund within 14 days of your purchase - no questions asked.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:ashwinsingh632@gmail.com?subject=Refund Request&body=Hi,%0A%0AI would like to request a refund for my recent credit purchase.%0A%0AAccount Email: [Your email]%0APurchase Date: [Date]%0AReason (optional): [Your reason]%0A%0AThank you."
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-success-500 hover:bg-success-400 text-white font-medium rounded-lg transition-colors shadow-lg"
                  >
                    <Mail className="w-4 h-4" />
                    Request Refund
                  </a>
                  <Link
                    href="/refund-policy"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-success-400 text-success-500 font-medium rounded-lg hover:bg-success-100 transition-colors text-sm"
                  >
                    View Full Policy
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA - Light with gradient accent */}
      <section className="py-16 bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-title mb-4">
              Ready to Start Scraping?
            </h2>
            <p className="text-lg text-body mb-8 max-w-2xl mx-auto">
              Get 500 credits for just $10 and unlock all features. No subscriptions, no commitments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-brand-600 to-accent-600 rounded-xl hover:from-brand-500 hover:to-accent-500 transition-all shadow-lg shadow-brand-500/25"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard/buy-credits"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-title bg-white border-2 border-grayblue-300 rounded-xl hover:border-brand-400 hover:shadow-md transition-all"
              >
                Buy Credits Now
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
