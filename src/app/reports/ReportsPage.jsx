import { BarChart2, Download, RefreshCw, PieChart, TrendingUp, Wrench, Trophy } from 'lucide-react'
import { useReports, useTechLeaderboard } from '../../features/reports/hooks/useReports'
import { KpiCards }           from '../../features/reports/components/KpiCards'
import { SeverityChart }      from '../../features/reports/components/SeverityChart'
import { JobTrendChart }      from '../../features/reports/components/JobTrendChart'
import { EquipmentBreakdown } from '../../features/reports/components/EquipmentBreakdown'
import { TechLeaderboard }    from '../../features/reports/components/TechLeaderboard'

function SectionCard({ icon: Icon, accent = 'var(--accent-cyan)', title, subtitle, children }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center"
               style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
            <Icon size={14} style={{ color: accent }} />
          </div>
          <div>
            <p className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{title}</p>
            {subtitle && <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
          </div>
        </div>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}

export default function ReportsPage() {
  const { summary, severity, trend, equipment, loading } = useReports()
  const tech = useTechLeaderboard()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                 style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
              <BarChart2 size={14} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <h1 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
              Analytics & Reports
            </h1>
          </div>
          <p className="text-xs font-mono ml-9" style={{ color: 'var(--text-muted)' }}>
            Last 30 days · auto-refreshed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
                  style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}>
            <RefreshCw size={11} /> Refresh
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
                  style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}>
            <Download size={11} /> Export PDF
          </button>
        </div>
      </div>

      {/* KPIs */}
      <KpiCards summary={summary} loading={loading} />

      {/* Row 1: Severity donut + Job Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <SectionCard icon={PieChart} title="Severity Distribution" subtitle="All time">
            <SeverityChart data={severity} loading={loading} />
          </SectionCard>
        </div>
        <div className="lg:col-span-3">
          <SectionCard icon={TrendingUp} accent="#2979ff" title="Job Volume — 14 Day Trend" subtitle="Resolved vs Escalated">
            <JobTrendChart data={trend} loading={loading} />
          </SectionCard>
        </div>
      </div>

      {/* Row 2: Equipment + Tech Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <SectionCard icon={Wrench} accent="#ffab40" title="Equipment Fault Breakdown" subtitle="Faults vs resolved">
            <EquipmentBreakdown data={equipment} loading={loading} />
          </SectionCard>
        </div>
        <div className="lg:col-span-3">
          <SectionCard icon={Trophy} accent="#a78bfa" title="Technician Leaderboard" subtitle={`${tech.total} technicians`}>
            <TechLeaderboard {...tech} />
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
