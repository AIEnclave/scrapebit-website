'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface PublicHeaderProps {
  variant?: 'light' | 'dark' | 'transparent'
  currentPage?: string
}

export default function PublicHeader({ variant = 'transparent', currentPage = '' }: PublicHeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Scrapers', href: '/scrapers' },
    { name: 'Pricing', href: '/pricing' },
  ]

  // Determine styles based on variant and scroll state
  const getHeaderStyles = () => {
    if (variant === 'dark' || variant === 'transparent') {
      return scrolled
        ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
        : 'bg-transparent'
    }
    // Light variant
    return scrolled
      ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
      : 'bg-white border-b border-gray-100'
  }

  const getTextColor = () => {
    if (variant === 'dark' || variant === 'transparent') return 'text-slate-400 hover:text-white'
    return 'text-gray-600 hover:text-gray-900'
  }

  const getActiveColor = () => {
    if (variant === 'dark' || variant === 'transparent') return 'text-white'
    return 'text-purple-600'
  }

  const getLogoTextColor = () => {
    if (variant === 'dark' || variant === 'transparent') return 'from-white to-slate-300'
    return 'from-gray-900 to-gray-700'
  }

  const isDark = variant === 'dark' || variant === 'transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyles()}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-9 h-9 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              scrolled ? 'shadow-purple-500/20' : 'shadow-purple-500/25'
            } group-hover:shadow-purple-500/40`}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`text-xl font-bold bg-gradient-to-r ${getLogoTextColor()} bg-clip-text text-transparent`}>
              Scrapebit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.name.toLowerCase() ||
                              (currentPage === '' && item.href === '/') ||
                              (item.href !== '/' && currentPage.startsWith(item.href.slice(1)))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    isActive ? getActiveColor() : getTextColor()
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={`text-sm transition-colors px-4 py-2 ${getTextColor()}`}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className={`group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/25 ${
                scrolled && isDark ? 'shadow-md shadow-purple-500/20' : ''
              }`}
            >
              <span className="relative z-10">Start Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className={`md:hidden p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}>
            <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
