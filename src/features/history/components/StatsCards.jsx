import { BarChart2, AlertOctagon, FolderOpen, CheckCircle2 } from 'lucide-react'

const CARDS = [
  {
    key: 'total',
    label: 'Total Analyses',
    icon: BarChart2,
    accent: '#00e5ff',
    bg: 'rgba(0,229,255,0.08)',
    border: 'rgba(0,229,255,0.2)',
  },
  {
    key: 'critical',
    label: 'Critical Issues',
    icon: AlertOctagon,
    accent: '#ff5252',
    bg: 'rgba(255,82,82,0.08)',
    border: 'rgba(255,82,82,0.2)',
  },
  {
    key: 'open',
    label: 'Open Sessions',
    icon: FolderOpen,
    accent: '#ffab40',
    bg: 'rgba(255,171,64,0.08)',
    border: 'rgba(255,171,64,0.2)',
  },
  {
    key: 'resolved',
    label: 'Resolved Sessions',
    icon: CheckCircle2,
    accent: '#69f0ae',
    bg: 'rgba(105,240,174,0.08)',
    border: 'rgba(105,240,174,0.2)',
  },
]

export function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {CARDS.map(({ key, label, icon: Icon, accent, bg, border }) => (
        <div
          key={key}
          className="rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-all duration-200"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <Icon size={18} style={{ color: accent }} />
          </div>
          <div className="min-w-0">
            <p
              className="font-display font-bold text-2xl sm:text-3xl leading-none"
              style={{ color: 'var(--text-primary)' }}
            >
              {stats[key] ?? 0}
            </p>
            <p
              className="text-[11px] font-mono mt-1 truncate"
              style={{ color: 'var(--text-muted)' }}
            >
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
