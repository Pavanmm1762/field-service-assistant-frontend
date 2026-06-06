import { Cpu, Wifi, ChevronDown, Bell, Settings } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { APP_NAME, APP_TAGLINE } from '../../lib/constants'
import { useAppContext } from '../../store/AppContext'

export function Header() {
  const { systemStatus } = useAppContext()

  return (
    <header className="sticky top-0 z-50 border-b border-surface-700 bg-surface-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center">
                <Cpu size={16} className="text-cyan-400" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 ring-2 ring-surface-950" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-sm text-text-primary tracking-tight">{APP_NAME}</span>
              <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase hidden sm:block">{APP_TAGLINE}</span>
            </div>
          </div>

          {/* Center nav - desktop only */}
          <nav className="hidden md:flex items-center gap-1">
            {['Diagnostics', 'History', 'Fleet', 'Reports'].map((item, i) => (
              <button
                key={item}
                className={`px-3 py-1.5 rounded-lg text-sm font-body transition-colors duration-150 ${
                  i === 0
                    ? 'bg-cyan-400/10 text-cyan-400'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <StatusIndicator status={systemStatus} />
            <button className="w-8 h-8 rounded-lg border border-surface-600 text-text-muted hover:text-text-primary hover:border-surface-500 transition-colors flex items-center justify-center">
              <Bell size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg border border-surface-600 text-text-muted hover:text-text-primary hover:border-surface-500 transition-colors flex items-center justify-center">
              <Settings size={14} />
            </button>
            <div className="hidden sm:flex items-center gap-2 ml-1 pl-3 border-l border-surface-700">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border border-cyan-400/20 flex items-center justify-center">
                <span className="text-[11px] font-display font-bold text-cyan-400">FT</span>
              </div>
              <ChevronDown size={12} className="text-text-muted" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function StatusIndicator({ status }) {
  const map = {
    online: { color: 'green', label: 'System Online' },
    degraded: { color: 'amber', label: 'Degraded' },
    offline: { color: 'red', label: 'Offline' },
  }
  const { color, label } = map[status] || map.online

  return (
    <Badge variant={color === 'green' ? 'green' : color === 'amber' ? 'amber' : 'red'}>
      <span className={`w-1.5 h-1.5 rounded-full bg-${color}-400 animate-pulse-slow`} />
      <span className="hidden sm:inline">{label}</span>
    </Badge>
  )
}
