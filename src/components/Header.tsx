'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">AI Scraper</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/terms-of-service" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1">
                Home
              </Link>
              <Link href="/pricing" className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1">
                Pricing
              </Link>
              <Link href="/terms-of-service" className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1">
                Refund Policy
              </Link>
              <div className="pt-2 flex flex-col gap-2">
                <Link href="#" className="text-base font-medium text-gray-600 hover:text-gray-900 px-2 py-1">
                  Sign In
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
