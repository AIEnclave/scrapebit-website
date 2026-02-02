'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Animated grid background for hero
function AnimatedGridBackground() {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate random particles only on client side to avoid hydration mismatch
    setParticles(
      [...Array(30)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 10,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Floating particles - rendered only on client */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full animate-float-particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Data flow lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dataFlow1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="dataFlow2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M-100,${150 + i * 120} Q${400 + i * 50},${100 + i * 30} ${800 + i * 100},${200 + i * 80} T1600,${150 + i * 100}`}
            fill="none"
            stroke={i % 2 === 0 ? 'url(#dataFlow1)' : 'url(#dataFlow2)'}
            strokeWidth="2"
            className="animate-dash"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>

      {/* Code/data snippets floating */}
      <div className="absolute top-[15%] left-[10%] text-purple-400/20 font-mono text-sm animate-float-code">
        {'{ "data": [...] }'}
      </div>
      <div className="absolute top-[25%] right-[15%] text-cyan-400/20 font-mono text-sm animate-float-code" style={{ animationDelay: '1s' }}>
        {'SELECT * FROM pages'}
      </div>
      <div className="absolute bottom-[30%] left-[20%] text-blue-400/20 font-mono text-sm animate-float-code" style={{ animationDelay: '2s' }}>
        {'export: "csv"'}
      </div>
      <div className="absolute bottom-[20%] right-[25%] text-purple-400/20 font-mono text-sm animate-float-code" style={{ animationDelay: '1.5s' }}>
        {'AI.extract()'}
      </div>
    </div>
  )
}

// AI-powered extraction visual
function AIExtractionVisual() {
  const [step, setStep] = useState(0)
  const [extractedData, setExtractedData] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (step === 2) {
      setExtractedData([])
      const items = ['Company Name', 'Email Address', 'Phone Number', 'Website URL']
      items.forEach((item, i) => {
        setTimeout(() => {
          setExtractedData(prev => [...prev, item])
        }, i * 300)
      })
    }
  }, [step])

  return (
    <div className="relative">
      {/* Glow effect behind */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse-slow" />

      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Top bar */}
        <div className="bg-slate-800/50 px-4 py-3 flex items-center gap-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 bg-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-slate-400 flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            company-directory.com/listings
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-xs text-purple-300 font-medium">Scrapebit Active</span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 min-h-[300px]">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {['Analyze', 'AI Process', 'Extract', 'Export'].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  step >= i ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {step > i ? '✓' : i + 1}
                </div>
                <span className={`text-xs hidden sm:block transition-colors ${step >= i ? 'text-purple-300' : 'text-slate-500'}`}>
                  {label}
                </span>
                {i < 3 && <div className={`w-8 h-0.5 transition-colors ${step > i ? 'bg-purple-500' : 'bg-slate-700'}`} />}
              </div>
            ))}
          </div>

          {/* Dynamic content based on step */}
          <div className="relative h-[180px]">
            {/* Step 0: Webpage preview */}
            <div className={`absolute inset-0 transition-all duration-500 ${step === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="bg-slate-800/50 rounded-lg p-4 h-full">
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-600/50 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-slate-700/50 rounded w-full" />
                    <div className="h-3 bg-slate-700/50 rounded w-5/6" />
                  </div>
                  <div className="w-20 h-20 bg-slate-600/50 rounded animate-pulse" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-8 bg-slate-700/50 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-center text-slate-400 text-sm mt-4">Scanning page structure...</p>
              </div>
            </div>

            {/* Step 1: AI Processing */}
            <div className={`absolute inset-0 transition-all duration-500 ${step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-spin-slow" />
                  <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-purple-300 mt-4 font-medium">AI analyzing content patterns...</p>
                <p className="text-slate-500 text-sm">Identifying data structures</p>
              </div>
            </div>

            {/* Step 2: Extracting */}
            <div className={`absolute inset-0 transition-all duration-500 ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="bg-slate-800/50 rounded-lg p-4 h-full">
                <p className="text-sm text-slate-400 mb-3">Extracted fields:</p>
                <div className="space-y-2">
                  {extractedData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 animate-slide-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-300 text-sm">{item}</span>
                      <span className="text-slate-500 text-xs ml-auto">100% match</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Export */}
            <div className={`absolute inset-0 transition-all duration-500 ${step === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex gap-4 mb-4">
                  {['CSV', 'JSON', 'Sheets', 'Notion'].map((format, i) => (
                    <div key={i} className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <span className="text-lg">
                        {format === 'CSV' && '📊'}
                        {format === 'JSON' && '{ }'}
                        {format === 'Sheets' && '📗'}
                        {format === 'Notion' && '📝'}
                      </span>
                      <span className="text-xs text-slate-400 mt-1">{format}</span>
                    </div>
                  ))}
                </div>
                <p className="text-green-400 font-medium">Ready to export!</p>
                <p className="text-slate-500 text-sm">156 records extracted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Testimonials Section with Animated Cards
function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    { name: 'Sarah Chen', country: 'USA', flag: '🇺🇸', text: 'Scrapebit saved us 40 hours per week on data collection. The AI just gets what you need!', role: 'Data Analyst', company: 'TechCorp' },
    { name: 'Akira Tanaka', country: 'Japan', flag: '🇯🇵', text: 'とても使いやすく、AIの精度が素晴らしい。チーム全員が愛用しています。', role: 'Engineer', company: 'Sony' },
    { name: 'Marcus Schmidt', country: 'Germany', flag: '🇩🇪', text: 'Die beste Lösung für Web-Scraping. No more broken selectors!', role: 'Developer', company: 'SAP' },
    { name: 'Priya Sharma', country: 'India', flag: '🇮🇳', text: 'Perfect for our market research. We extract competitor data in minutes, not days.', role: 'Marketing Lead', company: 'Flipkart' },
    { name: 'Lucas Silva', country: 'Brazil', flag: '🇧🇷', text: 'Incrível! Economizou muito tempo da nossa equipe de vendas.', role: 'Sales Director', company: 'Nubank' },
    { name: 'Emma Williams', country: 'UK', flag: '🇬🇧', text: 'Finally a scraping tool that just works. Brilliant for lead generation!', role: 'Product Manager', company: 'Revolut' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="relative">
      {/* Main content */}
      <div className="relative">
        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { value: '100K+', label: 'Active Users' },
            { value: '50+', label: 'Countries' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '10M+', label: 'Pages Scraped' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 ${
                activeIndex === index ? 'scale-105 z-10' : 'scale-100'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Card glow effect */}
              <div className={`absolute -inset-1 rounded-2xl blur-lg transition-opacity duration-500 ${
                activeIndex === index
                  ? 'opacity-100 bg-gradient-to-r from-purple-500/30 to-cyan-500/30'
                  : 'opacity-0 group-hover:opacity-50 bg-purple-500/20'
              }`} />

              {/* Card */}
              <div className={`relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer h-full ${
                activeIndex === index
                  ? 'border-purple-500/50 shadow-xl shadow-purple-500/10'
                  : 'border-slate-700/50 hover:border-slate-600/50'
              }`}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{testimonial.flag}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-xs text-slate-400">{testimonial.role} at {testimonial.company}</p>
                  </div>
                  {/* Country badge */}
                  <span className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">
                    {testimonial.country}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-slate-300 leading-relaxed text-sm">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex gap-0.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-8 bg-gradient-to-r from-purple-500 to-cyan-500'
                  : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Global Floating Particles - subtle background effect
function FloatingParticles({ count = 20, darkMode = true }: { count?: number; darkMode?: boolean }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 37 + 13) % 100,
    top: (i * 23 + 7) % 100,
    size: 1 + (i % 2), // 1-2px only
    duration: 15 + (i % 8) * 3,
    delay: (i % 7) * 2,
    colorIndex: i % 3,
  }))

  const getColor = (index: number, dark: boolean) => {
    const opacity = dark ? 0.4 : 0.25
    if (index === 0) return `rgba(139, 92, 246, ${opacity})`
    if (index === 1) return `rgba(6, 182, 212, ${opacity})`
    return `rgba(34, 197, 94, ${opacity})`
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: getColor(p.colorIndex, darkMode),
            boxShadow: darkMode ? `0 0 ${p.size * 2}px ${getColor(p.colorIndex, darkMode)}` : 'none',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Ceiling Spotlight Section Component
function CeilingSpotlightSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Light rays from ceiling */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main center light beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '100%',
            maxWidth: '800px',
            height: '500px',
            background: `
              conic-gradient(
                from 180deg at 50% 0%,
                transparent 40%,
                rgba(139, 92, 246, 0.08) 45%,
                rgba(255, 255, 255, 0.15) 48%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.15) 52%,
                rgba(6, 182, 212, 0.08) 55%,
                transparent 60%
              )
            `,
            maskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
          }}
        />

        {/* Secondary softer light rays */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 opacity-50"
          style={{
            width: '120%',
            maxWidth: '1200px',
            height: '600px',
            background: `
              conic-gradient(
                from 180deg at 50% 0%,
                transparent 35%,
                rgba(139, 92, 246, 0.05) 42%,
                rgba(255, 255, 255, 0.08) 47%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(255, 255, 255, 0.08) 53%,
                rgba(6, 182, 212, 0.05) 58%,
                transparent 65%
              )
            `,
            maskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
          }}
        />

        {/* Ambient top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px]"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Light particles/dust in the beam */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
            style={{
              left: `${40 + Math.random() * 20}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floor reflection/glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content in the spotlight */}
      <div className="relative pt-16 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-sm text-purple-300 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Stop Wasting Time
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Extract Data{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              10x Faster
            </span>
          </h2>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            Scrapebit uses AI to understand webpage structure. Just describe what you need - no coding, no CSS selectors, no breaking scripts.
          </p>

          {/* Feature highlights in spotlight */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-500/5 rounded-2xl blur-xl group-hover:bg-purple-500/10 transition-all" />
              <div className="relative bg-slate-800/70 backdrop-blur rounded-2xl p-6 border border-purple-500/20 text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                  <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Extraction</h3>
                <p className="text-sm text-slate-400">Describe data in plain English. Our AI finds and extracts it automatically.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl blur-xl group-hover:bg-cyan-500/10 transition-all" />
              <div className="relative bg-slate-800/70 backdrop-blur rounded-2xl p-6 border border-cyan-500/20 text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Bulk Data Export</h3>
                <p className="text-sm text-slate-400">Export to CSV, JSON, Google Sheets, or Notion. Handle thousands of pages.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500/5 rounded-2xl blur-xl group-hover:bg-green-500/10 transition-all" />
              <div className="relative bg-slate-800/70 backdrop-blur rounded-2xl p-6 border border-green-500/20 text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Anti-Bot Bypass</h3>
                <p className="text-sm text-slate-400">Built-in proxy rotation and browser fingerprinting. Works on protected sites.</p>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-slate-700/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2 Clicks</div>
              <div className="text-sm text-slate-400">To extract data</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm text-slate-400">Accuracy rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-slate-400">Sites supported</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Scroll-animated section wrapper
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Stats counter animation
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const increment = target / (duration / 16)

          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Sticky Header Component - Modern Glassmorphism Design
function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Scrapers', href: '/scrapers' },
    { name: 'Pricing', href: '/pricing' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className={`mx-auto max-w-6xl transition-all duration-500 ease-out ${
        scrolled ? 'py-2' : 'py-3'
      }`}>
        {/* Glassmorphism container */}
        <div className={`relative rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-slate-900/70 shadow-lg shadow-black/10'
            : 'bg-slate-900/40'
        } backdrop-blur-xl`}>
          {/* Gradient border effect */}
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-50'
          }`}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20" style={{ padding: '1px' }}>
              <div className="w-full h-full rounded-2xl bg-slate-900/90 backdrop-blur-xl" />
            </div>
          </div>

          {/* Inner border glow */}
          <div className={`absolute inset-[1px] rounded-2xl border transition-all duration-500 ${
            scrolled ? 'border-white/10' : 'border-white/5'
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
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Scrapebit
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      item.href === '/'
                        ? 'text-white bg-white/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:block text-sm font-medium px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
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
              <button className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
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

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Sticky Header */}
      <StickyHeader />

      {/* ============ DARK HERO SECTION ============ */}
      <div className="bg-slate-950">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <AnimatedGridBackground />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 pt-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text content */}
              <div>
                {/* AI Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm text-purple-300">Enterprise-Grade AI</span>
                  <span className="px-2 py-0.5 bg-purple-500/20 rounded text-xs text-purple-200">GPT-4 & Claude</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  Extract Any Data
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    With Just 2 Clicks
                  </span>
                </h1>

                <p className="mt-6 text-lg text-slate-400 max-w-xl">
                  AI-powered web scraping that understands context. No CSS selectors, no complex setup.
                  Just tell our AI what data you need, and watch it extract perfectly structured data in seconds.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {['AI Extraction', 'Auto-detect Schema', 'Smart Pagination', 'Anti-bot Bypass'].map((feature, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs text-slate-300">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="/signup"
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-purple-500/25"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Scraping Free
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 animate-shimmer" />
                  </Link>
                  <a
                    href="https://chromewebstore.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-slate-300 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.63-9.606z"/>
                    </svg>
                    Chrome Extension
                  </a>
                </div>

                {/* Custom scraping mention */}
                <div className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <p className="text-sm text-slate-400">
                    <span className="text-purple-400 font-medium">Need custom scraping?</span> We build tailored solutions for complex requirements, anti-bot challenges & enterprise scale.{' '}
                    <a href="mailto:ashwinsingh632@gmail.com?subject=Custom Scraping Requirement" className="text-cyan-400 hover:underline">Contact us →</a>
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    100 free credits
                  </div>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="hidden lg:block">
                <AIExtractionVisual />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============ LIGHT SECTION - TRUSTED BY ============ */}
      <section className="py-12 bg-white border-b border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider font-medium">Trusted by teams at</p>
          </AnimatedSection>
        </div>

        {/* Infinite scrolling marquee */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex animate-marquee">
            {/* First set of logos */}
            <div className="flex items-center gap-16 px-8 shrink-0">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Stripe', 'Shopify', 'Salesforce', 'Adobe', 'Slack', 'Notion', 'Figma'].map((company) => (
                <span key={company} className="text-gray-400 font-semibold text-xl whitespace-nowrap select-none">
                  {company}
                </span>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center gap-16 px-8 shrink-0">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Stripe', 'Shopify', 'Salesforce', 'Adobe', 'Slack', 'Notion', 'Figma'].map((company) => (
                <span key={`${company}-dup`} className="text-gray-400 font-semibold text-xl whitespace-nowrap select-none">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <FloatingParticles count={15} darkMode={false} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 100000, suffix: '+', label: 'Active Users', icon: '👥' },
              { value: 50, suffix: 'M+', label: 'Pages Scraped', icon: '📄' },
              { value: 500, suffix: '+', label: 'Websites Supported', icon: '🌐' },
              { value: 99.9, suffix: '%', label: 'Uptime SLA', icon: '⚡' },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Start Scraping in 3 Steps
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Install Extension', desc: 'Add Scrapebit to Chrome. Takes less than 10 seconds.', icon: '⚡' },
              { step: '02', title: 'Visit Any Page', desc: 'Go to any website and click the Scrapebit icon.', icon: '🌐' },
              { step: '03', title: 'Extract & Export', desc: 'AI extracts data automatically. Export anywhere.', icon: '✨' },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="relative text-center">
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-purple-300 to-transparent" />
                  )}
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-100 to-cyan-100 border border-purple-200 mb-6">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <div className="text-sm font-mono text-purple-600 mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DARK SECTION - CEILING SPOTLIGHT ============ */}
      <section className="py-24 bg-slate-950 overflow-hidden relative">
        <AnimatedSection>
          <CeilingSpotlightSection />
        </AnimatedSection>
        <FloatingParticles count={20} darkMode={true} />
      </section>

      {/* AI Capabilities Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <FloatingParticles count={25} darkMode={false} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-First Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Next-Gen AI Technology
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI understands web pages like a human does. It identifies patterns, extracts structured data, and handles edge cases automatically.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧠',
                title: 'Natural Language Commands',
                description: 'Just describe what you want. "Extract all product names and prices" - that\'s all it takes.',
                color: 'purple',
              },
              {
                icon: '🎯',
                title: 'Smart Schema Detection',
                description: 'AI automatically identifies data structures - tables, lists, cards, or any repeating pattern.',
                color: 'cyan',
              },
              {
                icon: '🔄',
                title: 'Self-Healing Selectors',
                description: 'When websites change, our AI adapts. No more broken scrapers due to HTML changes.',
                color: 'blue',
              },
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="group relative p-6 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* All-in-One Platform Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-4">
              Complete Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need to Extract Data
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              From simple extractions to complex automation workflows - we've got you covered.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📊', title: 'Data Extraction', desc: 'Tables, lists, any structured data', tag: 'Core' },
              { icon: '📸', title: 'Screenshots', desc: 'Full page or element captures', tag: 'Visual' },
              { icon: '📄', title: 'PDF Export', desc: 'Convert pages to clean PDFs', tag: 'Export' },
              { icon: '🔗', title: 'Subpage Scraping', desc: 'Follow links automatically', tag: 'Advanced' },
              { icon: '⏰', title: 'Scheduled Scraping', desc: 'Run at any interval', tag: 'Automation' },
              { icon: '📝', title: 'Content Extraction', desc: 'Articles, blogs, text content', tag: 'Content' },
              { icon: '🌍', title: 'Multi-language', desc: 'Auto-translate extracted data', tag: 'AI' },
              { icon: '🤖', title: 'AI Summarization', desc: 'Get key insights instantly', tag: 'AI' },
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div className="group p-4 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{feature.title}</h3>
                        <span className="px-1.5 py-0.5 bg-purple-100 rounded text-[10px] text-purple-600 font-medium flex-shrink-0">
                          {feature.tag}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Export & Integrations Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              Integrations & Exports
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Export Anywhere, Integrate Everything
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Send your data wherever you need it. Direct exports, webhooks, or use our API.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Export Options */}
            <AnimatedSection>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📤</span> Export Formats
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'CSV', icon: '📊', desc: 'Spreadsheet ready' },
                    { name: 'JSON', icon: '{ }', desc: 'Developer friendly' },
                    { name: 'Google Sheets', icon: '📗', desc: 'Direct sync' },
                    { name: 'Notion', icon: '📝', desc: 'Database import' },
                    { name: 'Airtable', icon: '📋', desc: 'Auto populate' },
                    { name: 'Excel', icon: '📈', desc: '.xlsx export' },
                  ].map((format, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-purple-300 transition-colors">
                      <span className="text-xl">{format.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{format.name}</div>
                        <div className="text-xs text-gray-500">{format.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Developer Tools */}
            <AnimatedSection delay={100}>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Developer Tools
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'REST API', desc: 'Full programmatic access to all features', tag: 'Public' },
                    { name: 'Webhooks', desc: 'Real-time notifications when scrapes complete', tag: 'Events' },
                    { name: 'Zapier', desc: 'Connect to 5000+ apps without code', tag: 'No-code' },
                    { name: 'JavaScript SDK', desc: 'npm install @scrapebit/sdk', tag: 'SDK' },
                    { name: 'Python SDK', desc: 'pip install scrapebit', tag: 'SDK' },
                  ].map((tool, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-purple-300 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{tool.name}</span>
                          <span className="px-1.5 py-0.5 bg-purple-100 rounded text-[10px] text-purple-600 font-medium">
                            {tool.tag}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{tool.desc}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ DARK SECTION - USE CASES ============ */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <FloatingParticles count={30} darkMode={true} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 mb-4">
              Use Cases
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Built for Every Team
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Sales, marketing, research, or development - extract the data that powers your work.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Lead Generation',
                desc: 'Extract contact info, company data, and social profiles from directories and LinkedIn.',
                users: 'Sales Teams',
                icon: '📈',
                gradient: 'from-blue-500 to-blue-600',
              },
              {
                title: 'Market Research',
                desc: 'Monitor competitors, track pricing changes, and gather market intelligence automatically.',
                users: 'Marketing Teams',
                icon: '🔍',
                gradient: 'from-purple-500 to-purple-600',
              },
              {
                title: 'Data Pipeline',
                desc: 'Feed your data warehouse with fresh web data. Schedule, transform, and deliver.',
                users: 'Engineering Teams',
                icon: '⚙️',
                gradient: 'from-cyan-500 to-cyan-600',
              },
            ].map((useCase, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="group relative p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-white/10 transition-all duration-300 h-full overflow-hidden backdrop-blur">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${useCase.gradient}`} />
                  <span className="text-4xl mb-4 block">{useCase.icon}</span>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{useCase.users}</span>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-3 group-hover:text-purple-400 transition-colors">{useCase.title}</h3>
                  <p className="text-slate-400">{useCase.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CHROME EXTENSION SECTION ============ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-cyan-100 text-sm font-medium text-purple-700 mb-4">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.63-9.606z"/>
                </svg>
                Chrome Extension
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Point. Click. <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Extract.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our Chrome extension brings the power of AI scraping directly to your browser. No coding, no setup - just install and start extracting data from any website.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: '🎯', title: 'Visual Selection', desc: 'Click on any element to select what data you want' },
                  { icon: '🤖', title: 'AI Auto-Detection', desc: 'AI automatically finds similar items on the page' },
                  { icon: '📊', title: 'Instant Export', desc: 'Download to CSV, JSON, or sync to Google Sheets' },
                  { icon: '🔄', title: 'Pagination Support', desc: 'Automatically scrape across multiple pages' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all group"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.63-9.606z"/>
                </svg>
                Add to Chrome - It&apos;s Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </AnimatedSection>

            {/* Right - Browser Mockup */}
            <AnimatedSection delay={200}>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl" />

                {/* Browser window */}
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  {/* Browser chrome */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-500 flex items-center gap-2 border border-gray-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      example-directory.com/companies
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-xs text-white font-medium">Scrapebit</span>
                    </div>
                  </div>

                  {/* Page content mockup */}
                  <div className="p-6 bg-gray-50 min-h-[300px]">
                    {/* Extension popup overlay */}
                    <div className="absolute top-16 right-4 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-10">
                      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-white font-semibold text-sm">Scrapebit</span>
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="text-xs text-gray-500 font-medium">Detected Data:</div>
                        <div className="space-y-1.5">
                          {['Company Name', 'Email', 'Phone', 'Website'].map((field, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-xs text-gray-700">{field}</span>
                            </div>
                          ))}
                        </div>
                        <button className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-semibold rounded-lg">
                          Extract 147 Items
                        </button>
                      </div>
                    </div>

                    {/* Fake page content */}
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`p-4 bg-white rounded-lg border-2 transition-all ${i === 1 ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-200'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div className="flex-1">
                              <div className="h-3 bg-gray-300 rounded w-32 mb-2" />
                              <div className="h-2 bg-gray-200 rounded w-48" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ DARK SECTION - TESTIMONIALS ============ */}
      <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        <FloatingParticles count={20} darkMode={true} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 mb-4">
              <span className="text-lg">🌍</span>
              Trusted Worldwide
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Loved by Users in <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">50+ Countries</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <TestimonialsSection />
          </AnimatedSection>
        </div>
      </section>

      {/* ============ LIGHT SECTIONS CONTINUE ============ */}

      {/* Custom Scraping CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30" />

              <div className="relative p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Enterprise & Custom Solutions
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Need Something Custom?
                    </h3>
                    <p className="text-purple-100 mb-6 max-w-lg">
                      Complex scraping requirements? Anti-bot challenges? Large scale operations?
                      Our team can build custom solutions tailored to your needs.
                    </p>
                    <ul className="text-white/80 text-sm space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Custom scraper development
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Dedicated infrastructure
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Priority support & SLA
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:ashwinsingh632@gmail.com?subject=Custom Scraping Requirement&body=Hi,%0A%0AI have a custom scraping requirement.%0A%0AWebsite(s): %0AData needed: %0AVolume: %0A%0APlease let me know how you can help.%0A%0AThanks!"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Sales
                    </a>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book a Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              Simple Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pay Per Use, No Subscriptions
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Credits never expire. All features included. Start free, scale as you grow.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl p-8 max-w-md mx-auto shadow-xl shadow-purple-500/20">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">⚡</span>
                <span className="text-4xl font-bold text-white">500 Credits</span>
              </div>
              <div className="text-5xl font-bold text-white mb-2">$10</div>
              <p className="text-purple-100 mb-6">One-time • Never expires</p>

              <ul className="text-left space-y-3 mb-8">
                {['1 credit = 1 page', 'All AI features', 'All export options', 'API access', 'Priority support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-white">
                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/pricing"
                className="block w-full py-3 px-6 text-center font-semibold text-purple-600 bg-white rounded-xl hover:bg-purple-50 transition-all shadow-lg"
              >
                View All Plans
              </Link>

              <p className="text-xs text-purple-200 mt-4">
                14-day money-back guarantee
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Extract Data Smarter?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 100,000+ users who trust Scrapebit for their data extraction needs. Start with 100 free credits today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/25"
              >
                Start Scraping Free
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer - Dark */}
      <footer className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Scrapebit</span>
              </div>
              <p className="text-sm text-slate-400 mb-4 max-w-xs">
                AI-powered web scraping made simple. Extract data from any website without code.
              </p>
              <div className="flex gap-3">
                {['twitter', 'github', 'linkedin'].map(social => (
                  <a key={social} href={`https://${social}.com`} className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                    <span className="sr-only">{social}</span>
                    {social === 'twitter' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>}
                    {social === 'github' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>}
                    {social === 'linkedin' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/scrapers" className="text-slate-400 hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/docs" className="text-slate-400 hover:text-white transition-colors">API Docs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/support" className="text-slate-400 hover:text-white transition-colors">Support</Link></li>
                <li><a href="mailto:ashwinsingh632@gmail.com" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/refund-policy" className="text-slate-400 hover:text-white transition-colors">Refunds</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} DataOtto. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fixed Bottom Bar */}
      <FixedBottomBar />
    </div>
  )
}

// Fixed Bottom Bar Component
function FixedBottomBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling 300px
      setIsScrolled(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
      {/* Gradient border top */}
      <div className="h-px bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />

      <div className="bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Left - Message */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Start scraping in seconds</p>
                <p className="text-xs text-slate-400">Free Chrome extension • No credit card required</p>
              </div>
            </div>

            {/* Center - Buttons */}
            <div className="flex items-center gap-3 flex-1 sm:flex-none justify-center sm:justify-end">
              {/* Chrome Extension Button */}
              <a
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.63-9.606z"/>
                </svg>
                <span className="hidden xs:inline">Add to Chrome</span>
                <span className="xs:hidden">Install</span>
              </a>

              {/* Custom Scraping Button */}
              <a
                href="mailto:ashwinsingh632@gmail.com?subject=Custom Scraping Requirement&body=Hi,%0A%0AI need a custom scraping solution.%0A%0AWebsite(s): %0AData needed: %0AVolume: %0A%0AThanks!"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="hidden sm:inline">Custom Scraping</span>
                <span className="sm:hidden">Custom</span>
              </a>

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
