'use client'

import { useState, useEffect } from 'react'
import { Loader2, Save, ExternalLink, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SavedPage() {
  const [scrapes, setScrapes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    loadScrapes()
  }, [])

  const loadScrapes = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) return

      const response = await fetch('http://localhost:3000/api/scrape-results/saved', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setScrapes(data.data || [])
      }
    } catch (error) {
      console.error('Error loading scrapes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (requestId: string) => {
    if (!confirm('Are you sure you want to delete this scrape?')) return

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) return

      const response = await fetch(`http://localhost:3000/api/scrape-results/request/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        loadScrapes()
      }
    } catch (error) {
      console.error('Error deleting scrape:', error)
    }
  }

  const totalPages = Math.ceil(scrapes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = scrapes.slice(startIndex, startIndex + itemsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    )
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Save className="w-5 h-5" />
            Saved Results
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {scrapes.length} saved scrape{scrapes.length !== 1 ? 's' : ''} • Page {currentPage} of {totalPages || 1}
          </p>
        </div>
      </div>

      <div className="p-6">
        {scrapes.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <Save className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-900 mb-2">No saved scrapes yet</p>
            <p className="text-sm text-gray-500">Your scraped data will appear here</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {currentItems.map((item) => (
                <div
                  key={item.requestId}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-brand-500 hover:text-brand-600 flex items-center gap-1"
                        >
                          {item.url.length > 60 ? `${item.url.substring(0, 60)}...` : item.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span>{item.rowCount} rows</span>
                        <span>•</span>
                        <span>{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(item.requestId)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-brand-500 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
