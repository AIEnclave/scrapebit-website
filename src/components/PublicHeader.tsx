'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface PublicHeaderProps {
  variant?: 'light' | 'dark'
  currentPage?: string
  sticky?: boolean
}

export default function PublicHeader({ variant = 'dark', currentPage = '', sticky = true }: PublicHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sticky) return // Don't track scroll for non-sticky headers
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Scrapers', href: '/scrapers' },
    { name: 'Pricing', href: '/pricing' },
  ]

  const resourceItems = [
    { name: 'Documentation', href: 'https://docs.scrapebit.com', icon: '📚', external: true },
    { name: 'Blog', href: 'https://blog.scrapebit.com', icon: '✍️', external: true },
    { name: 'Node.js SDK', href: 'https://www.npmjs.com/package/@scrapebit/sdk', icon: '📦', external: true },
    { name: 'Chrome Extension', href: 'https://chromewebstore.google.com/detail/scrapebit', icon: '🧩', external: true },
  ]

  const isDark = variant === 'dark'

  return (
    <header className={`${sticky ? 'fixed top-0 left-0 right-0' : 'relative'} z-50 px-4 pt-4`}>
      <nav className={`mx-auto max-w-6xl transition-all duration-500 ease-out ${
        scrolled
          ? 'py-2'
          : 'py-3'
      }`}>
        {/* Glassmorphism container */}
        <div className={`relative rounded-2xl transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-slate-900/70 shadow-lg shadow-black/10'
              : 'bg-white/70 shadow-lg shadow-black/5'
            : isDark
              ? 'bg-slate-900/40'
              : 'bg-white/40'
        } backdrop-blur-xl`}>
          {/* Gradient border effect */}
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-50'
          }`}>
            <div className={`absolute inset-0 rounded-2xl ${
              isDark
                ? 'bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20'
                : 'bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10'
            }`} style={{ padding: '1px' }}>
              <div className={`w-full h-full rounded-2xl ${
                isDark ? 'bg-slate-900/90' : 'bg-white/90'
              } backdrop-blur-xl`} />
            </div>
          </div>

          {/* Inner border glow */}
          <div className={`absolute inset-[1px] rounded-2xl border transition-all duration-500 ${
            isDark
              ? scrolled ? 'border-white/10' : 'border-white/5'
              : scrolled ? 'border-gray-200/80' : 'border-gray-200/40'
          }`} />

          {/* Content */}
          <div className="relative flex items-center justify-between px-4 sm:px-6 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                {/* Logo glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <span className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? 'from-white to-slate-300'
                  : 'from-gray-900 to-gray-600'
              }`}>
                Scrapebit
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className={`flex items-center gap-1 p-1 rounded-xl ${
                isDark ? 'bg-white/5' : 'bg-gray-100/80'
              }`}>
                {navItems.map((item) => {
                  const isActive = currentPage === item.name.toLowerCase() ||
                                  (currentPage === '' && item.href === '/') ||
                                  (item.href !== '/' && currentPage.startsWith(item.href.slice(1)))
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        isActive
                          ? isDark
                            ? 'text-white bg-white/10'
                            : 'text-gray-900 bg-white shadow-sm'
                          : isDark
                            ? 'text-slate-400 hover:text-white hover:bg-white/5'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}

                {/* Resources Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1 ${
                      isDark
                        ? 'text-slate-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    Resources
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {resourcesOpen && (
                    <div className={`absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl border overflow-hidden z-50 ${
                      isDark
                        ? 'bg-slate-900/95 border-white/10 backdrop-blur-xl'
                        : 'bg-white/95 border-gray-200 backdrop-blur-xl'
                    }`}>
                      <div className="py-2">
                        {resourceItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              isDark
                                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                            onClick={() => setResourcesOpen(false)}
                          >
                            <span className="text-base">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                            <svg className="w-3.5 h-3.5 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`hidden sm:block text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                  isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
              >
                {/* Button gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600" />
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <span className="relative z-10 flex items-center gap-1.5">
                  Start Free
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
