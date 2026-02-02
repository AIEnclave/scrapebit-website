import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import ScraperFilters from '@/components/ScraperFilters'
import PublicHeader from '@/components/PublicHeader'
import PublicFooter from '@/components/PublicFooter'

interface Template {
  id: number
  documentId: string
  title: string
  description: string
  category: string
  name: string
  label: string
  icon: {
    formats: {
      thumbnail: {
        url: string
      }
    }
    url: string 
  }
}

interface TemplatesData {
  templates: Template[]
}

export const metadata: Metadata = {
  title: 'Pre-Built Scrapers for Popular Websites | Scrapebit',
  description: 'Browse our collection of AI-powered scrapers ready to extract data from popular websites. Pre-built scrapers for Travel, E-commerce, Real Estate, and more. No coding required.',
  keywords: 'web scrapers, pre-built scrapers, website scrapers, data extraction tools, AI scrapers, automated scraping',
  openGraph: {
    title: 'Pre-Built Scrapers for Popular Websites | Scrapebit',
    description: 'Browse our collection of AI-powered scrapers ready to extract data from popular websites.',
    type: 'website',
  },
}

// Server-side data fetching
async function getTemplates(): Promise<Template[]> {
  try {
    const filePath = join(process.cwd(), 'src', 'data', 'templates.json')
    const fileContents = readFileSync(filePath, 'utf8')
    const data: TemplatesData = JSON.parse(fileContents)
    return data.templates || []
  } catch (error) {
    console.error('Error reading templates:', error)
    return []
  }
}

// Get all unique categories
function getCategories(templates: Template[]): string[] {
  const categories = new Set<string>()
  templates.forEach(template => {
    if (template.category) {
      categories.add(template.category)
    }
  })
  return Array.from(categories).sort()
}

// Group templates by category
function groupByCategory(templates: Template[]) {
  return templates.reduce((acc, template) => {
    const category = template.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(template)
    return acc
  }, {} as Record<string, Template[]>)
}

export default async function ScrapersPage() {
  const templates = await getTemplates()
  const categories = getCategories(templates)
  const groupedTemplates = groupByCategory(templates)

  return (
    <div className="bg-white min-h-screen">
      {/* Header - not sticky on this page, scrolls with content */}
      <PublicHeader variant="light" currentPage="scrapers" sticky={false} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
              Instant Data Scraper Templates
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Scrapebit's scraper models allow you to extract data from websites like LinkedIn, Instagram, Zillow, and more. Use Scrapebit to scrape any website or web app.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <ScraperFilters categories={categories} />

      {/* Templates Grid */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
            <div key={category} className="mb-12 category-section" data-category={category.toLowerCase().replace(/\s+/g, '-')}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-500 rounded-full"></span>
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryTemplates.map((template) => (
                  <Link
                    key={template.id}
                    href={`/scrapers/${template.name}`}
                    data-template-card
                    data-title={template.title}
                    data-description={template.description}
                    data-category={template.category}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    {/* Template Image */}
                    <div className="relative h-40 bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
                      {template.icon?.url ? (
                        <Image
                          src={template.icon.url}
                          alt={template.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      {/* Label Badge */}
                      {template.label && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-semibold rounded-full shadow-md">
                            {template.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Template Content */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {template.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-brand-600 font-medium">
                        <span>View Details</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {templates.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No scrapers available</h3>
              <p className="text-gray-600">Check back soon for new pre-built scrapers!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-cyan-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Extract Data using AI
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Easily transfer data to Google Sheets, Airtable, or Notion
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-purple-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-2xl"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
