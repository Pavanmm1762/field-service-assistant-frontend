import { Zap, CheckCircle2, Clock, AlertTriangle, Brain, Users } from 'lucide-react'
import { Spinner } from '../../../components/ui/Spinner'

const KPI_DEFS = [
  { key: 'totalJobs',       label: 'Total Jobs',          icon: Zap,           unit: '',  accent: '#2979ff' },
  { key: 'resolvedToday',   label: 'Resolved Today',      icon: CheckCircle2,  unit: '',  accent: '#69f0ae' },
  { key: 'avgResolutionMin',label: 'Avg. Resolution',     icon: Clock,         unit: 'm', accent: '#00e5ff' },
  { key: 'criticalOpen',    label: 'Critical Open',       icon: AlertTriangle, unit: '',  accent: '#ff5252' },
  { key: 'aiAccuracy',      label: 'AI Accuracy',         icon: Brain,         unit: '%', accent: '#a78bfa' },
  { key: 'fieldTechnicians',label: 'Field Technicians',   icon: Users,         unit: '',  accent: '#ffab40' },
]

export function KpiCards({ summary, loading }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {KPI_DEFS.map(({ key, label, icon: Icon, unit, accent }) => (
        <div
          key={key}
          className="rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
        >
          <div className="flex items-center justify-between">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
            >
              <Icon size={14} style={{ color: accent }} />
            </div>
          </div>
          {loading ? (
            <div className="h-7 flex items-center">
              <Spinner size="sm" />
            </div>
          ) : (
            <div>
              <p className="font-display font-bold text-2xl leading-none" style={{ color: 'var(--text-primary)' }}>
                {summary?.[key]}{unit}
              </p>
              <p className="text-[10px] font-mono mt-1 tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
                {label}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
