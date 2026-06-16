import { FileText, Layers, CheckCircle2, XCircle } from 'lucide-react'
import { Spinner } from '../../../components/ui/Spinner'

const DEFS = [
  { key: 'total',   label: 'Total Documents',   icon: FileText,     accent: '#2979ff' },
  { key: 'chunks',  label: 'Total Chunks',       icon: Layers,       accent: '#a78bfa' },
  { key: 'indexed', label: 'Indexed Documents',  icon: CheckCircle2, accent: '#69f0ae' },
  { key: 'failed',  label: 'Failed Documents',   icon: XCircle,      accent: '#ff5252' },
]

export function DocumentStatsCards({ stats, loading }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {DEFS.map(({ key, label, icon: Icon, accent }) => (
        <div
          key={key}
          className="rounded-2xl p-4 flex flex-col gap-3 transition-colors duration-300"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
          >
            <Icon size={15} style={{ color: accent }} />
          </div>

          {loading ? (
            <div className="h-8 flex items-center">
              <Spinner size="sm" />
            </div>
          ) : (
            <div>
              <p
                className="font-display font-bold text-2xl leading-none"
                style={{ color: key === 'failed' && stats?.[key] > 0 ? accent : 'var(--text-primary)' }}
              >
                {stats?.[key]?.toLocaleString() ?? '—'}
              </p>
              <p className="text-[10px] font-mono mt-1.5 tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                {label}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
