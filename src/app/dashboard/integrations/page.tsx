'use client'

import { useState, useEffect } from 'react'
import { Loader2, Plug, FileSpreadsheet, Database, FileText, Webhook, Zap, CheckCircle, Trash2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const PROVIDERS = {
  google_sheets: {
    name: 'Google Sheets',
    icon: FileSpreadsheet,
    description: 'Export your scraped data directly to Google Sheets',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  airtable: {
    name: 'Airtable',
    icon: Database,
    description: 'Sync data to Airtable bases and tables',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  notion: {
    name: 'Notion',
    icon: FileText,
    description: 'Export to Notion databases and pages',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
  },
  webhook: {
    name: 'Webhook',
    icon: Webhook,
    description: 'Send data to your custom webhook URL',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  zapier: {
    name: 'Zapier',
    icon: Zap,
    description: 'Connect to Zapier and automate workflows with 6000+ apps',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<string | null>(null)

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setLoading(false)
        return
      }

      const response = await fetch('http://localhost:3000/api/integrations', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setIntegrations(data.data || [])
      }
    } catch (error) {
      console.error('Load integrations error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = async (integrationId: string) => {
    if (!confirm('Are you sure you want to disconnect this integration?')) return

    try {
      setConnecting(integrationId)
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setConnecting(null)
        return
      }

      const response = await fetch(`http://localhost:3000/api/integrations/${integrationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (response.ok) {
        loadIntegrations()
      } else {
        const error = await response.json()
        alert(`Failed to disconnect: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Disconnect error:', error)
      alert('Failed to disconnect integration')
    } finally {
      setConnecting(null)
    }
  }

  const getIntegration = (provider: string) => integrations.find(i => i.provider === provider)

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
            <Plug className="w-5 h-5" />
            Integrations
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Connect external services to export your data
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {Object.entries(PROVIDERS).map(([key, provider]) => {
            const integration = getIntegration(key)
            const Icon = provider.icon
            const isConnected = integration?.isActive
            
            return (
              <div key={key} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${provider.bgColor}`}>
                      <Icon className={`w-6 h-6 ${provider.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-500">{provider.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isConnected ? (
                      <>
                        <span className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg">
                          Connected
                        </span>
                        <button
                          onClick={() => handleDisconnect(integration!.id)}
                          disabled={connecting === integration!.id}
                          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-50"
                        >
                          {connecting === integration!.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4" />
                              Disconnect
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => alert('Use the Chrome extension to connect integrations')}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-brand-500 text-white hover:bg-brand-600"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
