'use client'

import { useState, useEffect } from 'react'
import { Loader2, Zap, Save, Database, BarChart3, Clock } from 'lucide-react'
import { useBilling } from '@/hooks/useBilling'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const { billingStatus, creditsRemaining, loading: billingLoading } = useBilling()
  const [history, setHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalRows, setTotalRows] = useState(0)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setIsLoading(false)
        return
      }

      const response = await fetch('http://localhost:3000/api/scrape-results/saved', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setHistory(data.data || [])
        setTotalRows((data.data || []).reduce((sum: number, item: any) => sum + (item.rowCount || 0), 0))
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const mostRecent = history.length > 0 ? history[0] : null

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your account and activity</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Credits Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Credits Remaining</span>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            {billingLoading ? (
              <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{creditsRemaining}</p>
            )}
          </div>

          {/* Total Scrapes Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Scrapes</span>
              <Save className="w-5 h-5 text-brand-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{history.length}</p>
          </div>

          {/* Total Rows Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Rows Scraped</span>
              <Database className="w-5 h-5 text-magenta-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalRows.toLocaleString()}</p>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-500" />
            Activity Overview
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No activity data yet</p>
          ) : (
            <div className="space-y-4">
              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-48">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() - (6 - i))
                  const dayStart = new Date(date.setHours(0, 0, 0, 0))
                  const dayEnd = new Date(date.setHours(23, 59, 59, 999))
                  const dayScrapes = history.filter(item => {
                    const itemDate = new Date(item.timestamp)
                    return itemDate >= dayStart && itemDate <= dayEnd
                  }).length
                  const maxScrapes = Math.max(...Array.from({ length: 7 }, (_, j) => {
                    const d = new Date()
                    d.setDate(d.getDate() - (6 - j))
                    const ds = new Date(d.setHours(0, 0, 0, 0))
                    const de = new Date(d.setHours(23, 59, 59, 999))
                    return history.filter(item => {
                      const itemDate = new Date(item.timestamp)
                      return itemDate >= ds && itemDate <= de
                    }).length
                  }), 1)
                  const height = maxScrapes > 0 ? (dayScrapes / maxScrapes) * 100 : 0
                  
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center" style={{ height: '160px' }}>
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-brand-500 to-brand-400 transition-all hover:opacity-80"
                          style={{ height: `${height}%`, minHeight: dayScrapes > 0 ? '4px' : '0' }}
                          title={`${dayScrapes} scrapes on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-xs font-medium text-gray-700">{dayScrapes}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="/dashboard/saved"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <Save className="w-5 h-5 text-brand-500" />
              <div>
                <p className="font-medium text-gray-900">View All Saved Results</p>
                <p className="text-sm text-gray-500">{history.length} saved scrapes</p>
              </div>
            </a>
            {mostRecent && (
              <a
                href={`/dashboard/saved?id=${mostRecent.requestId}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
              >
                <Clock className="w-5 h-5 text-magenta-500" />
                <div>
                  <p className="font-medium text-gray-900">Most Recent Result</p>
                  <p className="text-sm text-gray-500">{mostRecent.rowCount} rows • {new Date(mostRecent.timestamp).toLocaleDateString()}</p>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No activity yet</p>
          ) : (
            <div className="space-y-3">
              {history.slice(0, 5).map((item) => (
                <div
                  key={item.requestId}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.url}</p>
                    <p className="text-xs text-gray-500">{item.rowCount} rows • {new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                  <a
                    href={`/dashboard/saved?id=${item.requestId}`}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors ml-4"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
