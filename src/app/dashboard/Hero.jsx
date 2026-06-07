import { Zap, Shield, Activity } from 'lucide-react'
import { useTheme } from '../../store/AppContext'

const STATS = [
  { icon: Zap,      label: 'Avg. Diagnosis',  value: '< 2s'  },
  { icon: Shield,   label: 'AI Accuracy',      value: '97.4%' },
  { icon: Activity, label: 'Issues Resolved',  value: '14.2K' },
]

export function Hero() {
  const { isDark } = useTheme()

  return (
    <div
      className="relative overflow-hidden py-10 sm:py-14 transition-colors duration-300"
      style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--bg-raised)' }}
    >
      {/* Grid pattern — adapts via --grid-line CSS var */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Top glow — stronger in dark, subtle in light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[220px] rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
        style={{
          background: 'var(--accent-cyan)',
          opacity: isDark ? 0.05 : 0.07,
        }}
      />

      {/* Bottom fade to base */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--bg-base))`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

          {/* ── Text block ── */}
          <div className="max-w-lg">
            {/* Version pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 transition-colors duration-300"
              style={{
                border: '1px solid var(--accent-cyan)',
                borderColor: isDark ? 'rgba(0,229,255,0.25)' : 'rgba(0,151,178,0.35)',
                background:  isDark ? 'rgba(0,229,255,0.06)' : 'rgba(0,151,178,0.08)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--accent-cyan)' }}
              />
              <span
                className="text-[11px] font-mono tracking-widest uppercase"
                style={{ color: 'var(--accent-cyan)' }}
              >
                AI Diagnostic Engine v2.4
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-display font-bold text-2xl sm:text-3xl leading-tight mb-3 transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
            >
              Multi-Modal Field{' '}
              <span
                style={{
                  color: 'var(--accent-cyan)',
                  textShadow: isDark ? '0 0 24px rgba(0,229,255,0.3)' : 'none',
                }}
              >
                Service Assistant
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-sm leading-relaxed transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              Upload equipment images for instant AI-powered fault detection
              and guided troubleshooting.
            </p>
          </div>

          {/* ── Stats strip ── */}
          <div className="flex gap-3 sm:gap-5 flex-wrap">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center min-w-[88px] px-4 py-3 rounded-2xl transition-all duration-300"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  border: '1px solid var(--border-default)',
                }}
              >
                {/* Icon circle */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-colors duration-300"
                  style={{
                    background: isDark ? 'rgba(0,229,255,0.08)' : 'rgba(0,151,178,0.1)',
                    border: isDark ? '1px solid rgba(0,229,255,0.18)' : '1px solid rgba(0,151,178,0.25)',
                  }}
                >
                  <Icon size={16} style={{ color: 'var(--accent-cyan)' }} />
                </div>

                <span
                  className="font-display font-bold text-lg leading-none transition-colors duration-300"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {value}
                </span>
                <span
                  className="text-[10px] font-mono mt-1 tracking-wide transition-colors duration-300"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
