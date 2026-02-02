'use client'

import { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'

interface ScraperFiltersProps {
  categories: string[]
}

export default function ScraperFilters({ categories }: ScraperFiltersProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleFilter = useCallback((filter: string) => {
    setActiveFilter(filter)
    const categorySections = document.querySelectorAll('.category-section')
    const templateCards = document.querySelectorAll('[data-template-card]')

    // If there's a search query, don't filter by category sections
    if (searchQuery) {
      return
    }

    // Show/hide sections based on category filter
    if (filter === 'all') {
      categorySections.forEach((section) => {
        section.classList.remove('hidden')
      })
    } else {
      categorySections.forEach((section) => {
        const sectionCategory = section.getAttribute('data-category')
        if (sectionCategory === filter) {
          section.classList.remove('hidden')
        } else {
          section.classList.add('hidden')
        }
      })
    }
  }, [searchQuery])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    const categorySections = document.querySelectorAll('.category-section')
    const templateCards = document.querySelectorAll('[data-template-card]')

    if (!query.trim()) {
      // Reset to show all based on current filter
      handleFilter(activeFilter)
      templateCards.forEach((card) => {
        card.classList.remove('hidden')
      })
      return
    }

    const searchLower = query.toLowerCase()

    // Show all sections first
    categorySections.forEach((section) => {
      section.classList.remove('hidden')
    })

    // Filter individual cards
    templateCards.forEach((card) => {
      const title = card.getAttribute('data-title')?.toLowerCase() || ''
      const description = card.getAttribute('data-description')?.toLowerCase() || ''
      const category = card.getAttribute('data-category')?.toLowerCase() || ''

      if (title.includes(searchLower) || description.includes(searchLower) || category.includes(searchLower)) {
        card.classList.remove('hidden')
      } else {
        card.classList.add('hidden')
      }
    })

    // Hide empty sections
    categorySections.forEach((section) => {
      const visibleCards = section.querySelectorAll('[data-template-card]:not(.hidden)')
      if (visibleCards.length === 0) {
        section.classList.add('hidden')
      }
    })
  }, [activeFilter, handleFilter])

  return (
    <section className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          {/* Top row: Logo + Search + CTA */}
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Compact Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:block">Scrapebit</span>
            </Link>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search scrapers..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/signup"
              className="shrink-0 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all"
            >
              Start Free
            </Link>
          </div>

          {/* Bottom row: Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
            <button
              onClick={() => handleFilter('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => {
              const filterValue = category.toLowerCase().replace(/\s+/g, '-')
              return (
                <button
                  key={category}
                  onClick={() => handleFilter(filterValue)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === filterValue
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
