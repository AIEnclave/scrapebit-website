'use client'

import { useEffect } from 'react'

interface ScraperFiltersProps {
  categories: string[]
}

export default function ScraperFilters({ categories }: ScraperFiltersProps) {
  useEffect(() => {
    const filterButtons = document.querySelectorAll('.filter-btn')
    const categorySections = document.querySelectorAll('.category-section')

    const handleFilter = (filter: string) => {
      // Update active state
      filterButtons.forEach((btn) => {
        const btnFilter = btn.getAttribute('data-filter')
        if (btnFilter === filter) {
          btn.classList.add('active', 'bg-gray-100', 'text-gray-700')
          btn.classList.remove('text-gray-600')
        } else {
          btn.classList.remove('active', 'bg-gray-100', 'text-gray-700')
          btn.classList.add('text-gray-600')
        }
      })

      // Show/hide sections
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
    }

    // Add click handlers
    filterButtons.forEach((btn) => {
      const clickHandler = () => {
        const filter = btn.getAttribute('data-filter')
        if (filter) handleFilter(filter)
      }
      btn.addEventListener('click', clickHandler)
    })

    return () => {
      filterButtons.forEach((btn) => {
        btn.removeEventListener('click', () => {})
      })
    }
  }, [categories])

  return (
    <section className="bg-white border-b border-gray-200 sticky top-[69px] z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          <button
            data-filter="all"
            className="filter-btn active px-6 py-2.5 rounded-full text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all whitespace-nowrap"
          >
            All
          </button>
          {categories.map((category) => {
            const filterValue = category.toLowerCase().replace(/\s+/g, '-')
            return (
              <button
                key={category}
                data-filter={filterValue}
                className="filter-btn px-6 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all whitespace-nowrap"
                data-category={category}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
