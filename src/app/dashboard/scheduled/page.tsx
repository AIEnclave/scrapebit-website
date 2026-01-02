'use client'

import { useState, useEffect } from 'react'
import { Loader2, Calendar, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ScheduledPage() {
  const [scheduled, setScheduled] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadScheduled()
  }, [])

  const loadScheduled = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setLoading(false)
        return
      }

      const response = await fetch('http://localhost:3000/api/scheduled', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setScheduled(data.data || [])
      }
    } catch (error) {
      console.error('Error loading scheduled:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this scheduled scrape?')) return
    
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) return

      const response = await fetch(`http://localhost:3000/api/scheduled/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        loadScheduled()
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />
      case 'running': return <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

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
            <Calendar className="w-5 h-5" />
            Scheduled Scrapes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {scheduled.length} scheduled scrape{scheduled.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="p-6">
        {scheduled.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-900 mb-2">No scheduled scrapes</p>
            <p className="text-sm text-gray-500">Schedule automated data extraction from the extension</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scheduled.map((scrape) => (
              <div key={scrape.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{scrape.url}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        {getStatusIcon(scrape.status)}
                        {scrape.status}
                      </span>
                      <span>{new Date(scrape.scheduledTime).toLocaleString()}</span>
                      <span className="capitalize">{scrape.repeat}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(scrape.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
