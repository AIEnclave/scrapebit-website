import { readFileSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from "react-markdown";
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

interface Template {
  id: number
  documentId: string
  title: string
  description: string
  contents: string
  category: string
  name: string
  label: string
  icon: {
    url: string
    thumbnail: string
  }
}

interface TemplatesData {
  templates: Template[]
}

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

function Table({ content }: { content: string }) {
  const lines = content
    .trim()
    .split('\n')
    .filter(line => line.includes('|'))

  const header = lines[0]
    .split('|')
    .filter(Boolean)
    .map(cell => cell.trim())

  const body = lines.slice(2).map(line =>
    line.split('|').filter(Boolean).map(cell => cell.trim())
  )

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-gray-50">
          <tr>
            {header.map((cell, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                <ReactMarkdown>{cell}</ReactMarkdown>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {body.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 transition-colors"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-gray-700 leading-relaxed"
                >
                  <ReactMarkdown>{cell}</ReactMarkdown>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


async function getTemplate(slug: string): Promise<Template | null> {
  const templates = await getTemplates()
  return templates.find(t => t.name === slug) || null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const template = await getTemplate(slug)

  if (!template) {
    return {
      title: 'Scraper Not Found | Scrapebit',
    }
  }

  return {
    title: `${template.title} | Scrapebit Scraper`,
    description: template.description,
    keywords: `${template.title}, web scraper, ${template.category} scraper, data extraction, AI scraper`,
    openGraph: {
      title: `${template.title} | Scrapebit`,
      description: template.description,
      type: 'website',
    },
  }
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const template = await getTemplate(slug)
  const components = { Table }
  if (!template) {
    notFound()
  }


  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Scrapebit</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/scrapers" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">
                ← Back to Scrapers
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Template Detail */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Template Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {template.icon?.url && (
              <div className="relative w-36 h-36 rounded-xl overflow-hidden">
                <Image
                  src={template.icon.url}
                  alt={template.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full">
                  {template.category}
                </span>
                {template.label && (
                  <span className="px-3 py-1 bg-brand-500 text-white text-xs font-semibold rounded-full">
                    {template.label}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{template.title}</h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">{template.description}</p>
        </div>

        {/* Template Content */}


        <article
          className="
            max-w-5xl mx-auto
            py-2
            space-y-8
            text-gray-800
            leading-7
            tracking-[0.01em]
          "
        >
          <MDXRemote source={template.contents} components={{ Table }} />
        </article>
        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to use this template?</h3>
          <p className="text-gray-600 mb-6">
            Install the Scrapebit Chrome extension and start scraping in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/scrapers"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
            >
              Browse More Scrapers
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}

