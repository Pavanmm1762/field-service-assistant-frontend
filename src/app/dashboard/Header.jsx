import { Cpu, ChevronDown, Bell, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Badge }       from '../../components/ui/Badge'
import { ThemeToggle } from '../../components/ui/ThemeToggle'
import { APP_NAME, APP_TAGLINE } from '../../lib/constants'
import { useAppContext } from '../../store/AppContext'

const NAV_ITEMS = [
  { label: 'Diagnostics', to: '/' },
  { label: 'History',     to: '/history' },
  { label: 'Reports',     to: '/reports' },
  { label: 'Documents',   to: '/documents' },
]

export function Header() {
  const { systemStatus } = useAppContext()
  const { pathname } = useLocation()

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        borderBottom: '1px solid var(--border-default)',
        background: 'color-mix(in srgb, var(--bg-base) 80%, transparent)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(41,121,255,0.15))', border: '1px solid rgba(0,229,255,0.3)' }}
              >
                <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2"
                style={{ background: '#69f0ae', ringColor: 'var(--bg-base)' }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {APP_NAME}
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                {APP_TAGLINE}
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, to }) => {
              const active = to !== '#' && (to === '/' ? pathname === '/' : pathname.startsWith(to))
              return (
                <Link
                  key={label}
                  to={to}
                  className="px-3 py-1.5 rounded-lg text-sm font-body transition-colors duration-150"
                  style={active
                    ? { background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }
                    : { color: 'var(--text-secondary)' }
                  }
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)' } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' } }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <StatusBadge status={systemStatus} />

            <ThemeToggle />

            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ border: '1px solid var(--border-default)', color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
            >
              <Bell size={14} />
            </button>

            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ border: '1px solid var(--border-default)', color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
            >
              <Settings size={14} />
            </button>

            <div
              className="hidden sm:flex items-center gap-2 ml-1 pl-3"
              style={{ borderLeft: '1px solid var(--border-default)' }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(41,121,255,0.2))', border: '1px solid rgba(0,229,255,0.2)' }}
              >
                <span className="text-[11px] font-display font-bold" style={{ color: 'var(--accent-cyan)' }}>FT</span>
              </div>
              <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <nav
          className="md:hidden flex items-center gap-1 pb-2 overflow-x-auto"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {NAV_ITEMS.map(({ label, to }) => {
            const active = to !== '#' && (to === '/' ? pathname === '/' : pathname.startsWith(to))
            return (
              <Link
                key={label}
                to={to}
                className="shrink-0 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors mt-1"
                style={active
                  ? { background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }
                  : { color: 'var(--text-secondary)' }
                }
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

function StatusBadge({ status }) {
  const map = {
    online:   { color: '#69f0ae', label: 'Online' },
    degraded: { color: '#ffab40', label: 'Degraded' },
    offline:  { color: '#ff5252', label: 'Offline' },
  }
  const { color, label } = map[status] || map.online
  return (
    <div
      className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono"
      style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
      {label}
    </div>
  )
}
