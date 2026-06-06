import { Zap, Shield, Activity } from 'lucide-react'

const STATS = [
  { icon: Zap, label: 'Avg. Diagnosis Time', value: '< 2s' },
  { icon: Shield, label: 'Detection Accuracy', value: '97.4%' },
  { icon: Activity, label: 'Issues Resolved', value: '14.2K' },
]

export function Hero() {
  return (
    <div className="relative overflow-hidden py-10 sm:py-14 border-b border-surface-700">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Text */}
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono text-cyan-400 tracking-widest uppercase">AI Diagnostic Engine v2.4</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight mb-2">
              Multi-Modal Field{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Service Assistant
              </span>
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              Upload equipment images for instant AI-powered fault detection and guided troubleshooting. Built for field technicians operating in high-pressure environments.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-4 sm:gap-6 flex-wrap">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center text-center min-w-[80px]">
                <div className="w-9 h-9 rounded-xl bg-surface-700 border border-surface-600 flex items-center justify-center mb-2">
                  <Icon size={16} className="text-cyan-400" />
                </div>
                <span className="font-display font-bold text-lg text-text-primary leading-none">{value}</span>
                <span className="text-[10px] font-mono text-text-muted mt-0.5 tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
