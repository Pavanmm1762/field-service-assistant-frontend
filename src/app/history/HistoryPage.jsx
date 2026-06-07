import { useState } from 'react'
import {
  Clock, Download, RefreshCw, Search,
  SlidersHorizontal, X, Filter,
} from 'lucide-react'
import { useHistory } from '../../features/history/hooks/useHistory'
import { HistoryList }  from '../../features/history/components/HistoryList'
import { StatsCards }   from '../../features/history/components/StatsCards'
import { Pagination }   from '../../components/ui/Pagination'
import SessionDetailPage from './SessionDetailPage'

const SEVERITY_OPTIONS = ['All', 'Critical', 'High', 'Medium', 'Low']
const STATUS_OPTIONS   = ['All', 'Open', 'Resolved']

export default function HistoryPage() {
  const {
    records, total, totalPages, page, setPage,
    loading, filters, updateFilter, clearFilters, stats, pageSize,
  } = useHistory()

  // Local session-detail state (no URL nav needed — SPA drill-down)
  const [detailId, setDetailId] = useState(null)

  if (detailId) {
    return <SessionDetailPage id={detailId} onBack={() => setDetailId(null)} />
  }

  const hasFilters = filters.severity || filters.status || filters.search

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-7">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(0,229,255,0.08)',
                border: '1px solid rgba(0,229,255,0.2)',
              }}
            >
              <Clock size={16} style={{ color: '#00e5ff' }} />
            </div>
            <h1
              className="font-display font-bold text-2xl tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Analysis History
            </h1>
          </div>
          <p
            className="text-sm ml-[42px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            Review previous diagnostics and troubleshooting sessions
          </p>
        </div>

        <div className="flex items-center gap-2 ml-[42px] sm:ml-0">
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all duration-150 active:scale-95"
            style={{
              border: '1px solid var(--border-default)',
              color: 'var(--text-secondary)',
              background: 'var(--bg-elevated)',
            }}
          >
            <RefreshCw size={12} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all duration-150 active:scale-95"
            style={{
              border: '1px solid var(--border-default)',
              color: 'var(--text-secondary)',
              background: 'var(--bg-elevated)',
            }}
          >
            <Download size={12} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* ── Stats row ───────────────────────────────────────────────────── */}
      <StatsCards stats={stats} />

      {/* ── Search + filters bar ────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
        }}
      >
        <div className="flex items-center gap-2 shrink-0" style={{ color: 'var(--text-muted)' }}>
          <Filter size={14} />
          <span className="text-[10px] font-mono tracking-widest uppercase">Filter</span>
        </div>

        <div className="flex flex-wrap gap-2 flex-1 w-full">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search equipment, issue, technician…"
              value={filters.search}
              onChange={e => updateFilter('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm font-body outline-none transition-colors"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,229,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
            />
          </div>

          {/* Severity filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {SEVERITY_OPTIONS.map(opt => {
              const val = opt === 'All' ? '' : opt
              const active = (filters.severity || '') === val
              const colors = {
                Critical: '#ff5252', High: '#fb923c', Medium: '#ffab40', Low: '#69f0ae', All: 'var(--accent-cyan)',
              }
              const c = colors[opt]
              return (
                <button
                  key={opt}
                  onClick={() => updateFilter('severity', val)}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-150"
                  style={active
                    ? { background: `${c}18`, border: `1px solid ${c}50`, color: c }
                    : { background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }
                  }
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-1.5">
            {STATUS_OPTIONS.map(opt => {
              const val = opt === 'All' ? '' : opt
              const active = (filters.status || '') === val
              const c = opt === 'Open' ? '#ffab40' : opt === 'Resolved' ? '#69f0ae' : 'var(--accent-cyan)'
              return (
                <button
                  key={opt}
                  onClick={() => updateFilter('status', val)}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-150"
                  style={active
                    ? { background: `${c}18`, border: `1px solid ${c}50`, color: c }
                    : { background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }
                  }
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearFilters}
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

      {/* ── Results count ───────────────────────────────────────────────── */}
      {!loading && (
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            Showing{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{records.length}</span>
            {' '}of{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{total}</span>
            {' '}sessions
          </p>
          {hasFilters && (
            <p className="text-xs font-mono" style={{ color: 'var(--accent-cyan)' }}>
              Filters active
            </p>
          )}
        </div>
      )}

      {/* ── Card grid ───────────────────────────────────────────────────── */}
      <HistoryList
        records={records}
        loading={loading}
        onViewDetails={setDetailId}
      />

      {/* ── Pagination ──────────────────────────────────────────────────── */}
      {!loading && total > pageSize && (
        <div
          className="rounded-2xl px-5 py-4"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
        >
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
