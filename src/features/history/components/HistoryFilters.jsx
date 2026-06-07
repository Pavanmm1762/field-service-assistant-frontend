import { Search, SlidersHorizontal, X } from 'lucide-react'

const SEVERITIES = ['', 'Critical', 'High', 'Medium', 'Low']
const STATUSES   = ['', 'Resolved', 'Pending', 'Escalated', 'In Progress']

const SEV_STYLES = {
  Critical:    { color: 'var(--accent-red)',   bg: 'rgba(255,82,82,0.12)',   border: 'rgba(255,82,82,0.3)' },
  High:        { color: '#fb923c',             bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.3)' },
  Medium:      { color: 'var(--accent-amber)', bg: 'rgba(255,171,64,0.12)', border: 'rgba(255,171,64,0.3)' },
  Low:         { color: 'var(--accent-green)', bg: 'rgba(105,240,174,0.12)',border: 'rgba(105,240,174,0.3)' },
}

export function HistoryFilters({ filters, onFilter, onClear }) {
  const hasActive = filters.severity || filters.status || filters.search

  return (
    <div
      className="rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
    >
      <div className="flex items-center gap-2 shrink-0" style={{ color: 'var(--text-muted)' }}>
        <SlidersHorizontal size={14} />
        <span className="text-xs font-mono font-medium tracking-widest uppercase">Filters</span>
      </div>

      <div className="flex flex-wrap gap-2 flex-1">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search ID, equipment, technician…"
            value={filters.search}
            onChange={(e) => onFilter('search', e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs font-mono outline-none transition-colors"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Severity */}
        <FilterSelect
          value={filters.severity}
          onChange={(v) => onFilter('severity', v)}
          placeholder="All Severities"
          options={SEVERITIES.filter(Boolean)}
        />

        {/* Status */}
        <FilterSelect
          value={filters.status}
          onChange={(v) => onFilter('status', v)}
          placeholder="All Statuses"
          options={STATUSES.filter(Boolean)}
        />
      </div>

      {hasActive && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors shrink-0"
          style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
        >
          <X size={11} />
          Clear
        </button>
      )}
    </div>
  )
}

function FilterSelect({ value, onChange, placeholder, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 rounded-lg text-xs font-mono outline-none cursor-pointer transition-colors"
      style={{
        background: 'var(--bg-elevated)',
        border: `1px solid ${value ? 'var(--accent-cyan)' : 'var(--border-default)'}`,
        color: value ? 'var(--accent-cyan)' : 'var(--text-secondary)',
        minWidth: '140px',
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  )
}
