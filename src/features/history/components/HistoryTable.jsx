import { Clock, MapPin, User, ChevronRight } from 'lucide-react'
import { Spinner } from '../../../components/ui/Spinner'

const SEV = {
  Critical:   { bg: 'rgba(255,82,82,0.12)',   color: '#ff5252', border: 'rgba(255,82,82,0.3)' },
  High:       { bg: 'rgba(251,146,60,0.12)',  color: '#fb923c', border: 'rgba(251,146,60,0.3)' },
  Medium:     { bg: 'rgba(255,171,64,0.12)',  color: '#ffab40', border: 'rgba(255,171,64,0.3)' },
  Low:        { bg: 'rgba(105,240,174,0.12)', color: '#69f0ae', border: 'rgba(105,240,174,0.3)' },
}

const STATUS = {
  Resolved:    { bg: 'rgba(105,240,174,0.1)', color: '#69f0ae', border: 'rgba(105,240,174,0.25)' },
  Pending:     { bg: 'rgba(255,171,64,0.1)',  color: '#ffab40', border: 'rgba(255,171,64,0.25)' },
  Escalated:   { bg: 'rgba(255,82,82,0.1)',   color: '#ff5252', border: 'rgba(255,82,82,0.25)' },
  'In Progress':{ bg: 'rgba(41,121,255,0.1)', color: '#2979ff', border: 'rgba(41,121,255,0.25)' },
}

function formatTime(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function Chip({ label, map }) {
  const s = map[label] || { bg: 'transparent', color: 'var(--text-muted)', border: 'var(--border-default)' }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {label}
    </span>
  )
}

export function HistoryTable({ records, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!records.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
          <Clock size={20} style={{ color: 'var(--text-muted)' }} />
        </div>
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>No records match your filters</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
              {['Job ID', 'Equipment', 'Issue', 'Severity', 'Technician', 'Status', 'Time', 'Dur.'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[10px] font-mono font-medium tracking-widest uppercase"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {h}
                </th>
              ))}
              <th className="px-4 py-3 w-8" />
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr
                key={r.id}
                className="group cursor-pointer transition-colors duration-100"
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  animationDelay: `${idx * 30}ms`,
                  animation: 'fadeUp 0.3s ease-out forwards',
                  opacity: 0,
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>{r.id}</td>
                <td className="px-4 py-3 font-medium text-xs" style={{ color: 'var(--text-primary)' }}>{r.equipment}</td>
                <td className="px-4 py-3 text-xs max-w-[160px] truncate" style={{ color: 'var(--text-secondary)' }}>{r.issue}</td>
                <td className="px-4 py-3"><Chip label={r.severity} map={SEV} /></td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1.5">
                    <User size={11} style={{ color: 'var(--text-muted)' }} />
                    {r.technician}
                  </span>
                </td>
                <td className="px-4 py-3"><Chip label={r.status} map={STATUS} /></td>
                <td className="px-4 py-3 text-xs font-mono whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{formatTime(r.timestamp)}</td>
                <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{r.duration}</td>
                <td className="px-4 py-3">
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)', opacity: 0 }}
                    className="group-hover:opacity-100 transition-opacity" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {records.map((r, idx) => (
          <div
            key={r.id}
            className="rounded-xl p-4 flex flex-col gap-2.5"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              animationDelay: `${idx * 30}ms`,
              animation: 'fadeUp 0.3s ease-out forwards',
              opacity: 0,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>{r.id}</span>
              <div className="flex items-center gap-1.5">
                <Chip label={r.severity} map={SEV} />
                <Chip label={r.status} map={STATUS} />
              </div>
            </div>
            <div>
              <p className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{r.equipment}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{r.issue}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1"><User size={10} />{r.technician}</span>
              <span className="flex items-center gap-1"><MapPin size={10} />{r.location}</span>
              <span className="flex items-center gap-1"><Clock size={10} />{formatTime(r.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
