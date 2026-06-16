import { Search, Filter, X } from 'lucide-react'
import { UNIQUE_EQUIPMENT, STATUS_OPTIONS } from '../api/documentsApi'

const STATUS_LABELS = { indexed: 'Indexed', pending: 'Pending', failed: 'Failed' }
const STATUS_COLORS = {
  indexed: '#69f0ae',
  pending: '#ffab40',
  failed:  '#ff5252',
}

export function DocumentFilters({ filters, onFilter, onClear }) {
  const hasActive = filters.search || filters.equipment || filters.status

  return (
    <div
      className="rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center transition-colors duration-300"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
    >
      {/* Label */}
      <div className="flex items-center gap-2 shrink-0" style={{ color: 'var(--text-muted)' }}>
        <Filter size={14} />
        <span className="text-[10px] font-mono tracking-widest uppercase">Filter</span>
      </div>

      <div className="flex flex-wrap gap-2 flex-1 w-full">

        {/* Filename / equipment search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search filename or equipment…"
            value={filters.search}
            onChange={e => onFilter('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-sm font-body outline-none transition-colors"
            style={{
              background: 'var(--bg-elevated)',
              border: `1px solid ${filters.search ? 'rgba(0,229,255,0.45)' : 'var(--border-default)'}`,
              color: 'var(--text-primary)',
            }}
            onFocus={e  => e.target.style.borderColor = 'rgba(0,229,255,0.45)'}
            onBlur={e   => e.target.style.borderColor = filters.search ? 'rgba(0,229,255,0.45)' : 'var(--border-default)'}
          />
        </div>

        {/* Equipment select */}
        <select
          value={filters.equipment}
          onChange={e => onFilter('equipment', e.target.value)}
          className="px-3 py-2 rounded-xl text-sm font-mono outline-none cursor-pointer transition-colors"
          style={{
            background: 'var(--bg-elevated)',
            border: `1px solid ${filters.equipment ? 'rgba(0,229,255,0.45)' : 'var(--border-default)'}`,
            color: filters.equipment ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            minWidth: '160px',
          }}
        >
          <option value="">All Equipment</option>
          {UNIQUE_EQUIPMENT.map(eq => (
            <option key={eq} value={eq}>{eq}</option>
          ))}
        </select>

        {/* Status pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* "All" pill */}
          <button
            onClick={() => onFilter('status', '')}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-150"
            style={!filters.status
              ? { background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.35)', color: 'var(--accent-cyan)' }
              : { background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }
            }
          >
            All
          </button>
          {STATUS_OPTIONS.map(s => {
            const active = filters.status === s
            const c = STATUS_COLORS[s]
            return (
              <button
                key={s}
                onClick={() => onFilter('status', s)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-150"
                style={active
                  ? { background: `${c}18`, border: `1px solid ${c}50`, color: c }
                  : { background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }
                }
              >
                {STATUS_LABELS[s]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Clear button */}
      {hasActive && (
        <button
          onClick={onClear}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-colors"
          style={{
            border: '1px solid var(--border-default)',
            color: 'var(--text-secondary)',
            background: 'var(--bg-elevated)',
          }}
        >
          <X size={11} />
          Clear
        </button>
      )}
    </div>
  )
}
