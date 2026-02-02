'use client'

import { Search } from 'lucide-react'

export default function ResearchPage() {
  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Deep Research
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered research across multiple sources
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-900 mb-2">Coming Soon</p>
          <p className="text-sm text-gray-500">Deep research capabilities powered by Dataotto</p>
        </div>
      </div>
    </div>
  )
}
