import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

export function Pagination({ page, totalPages, onPageChange, totalItems, pageSize, className = '' }) {
  if (totalPages <= 1) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  const getPages = () => {
    const pages = []
    const delta = 1
    const left = Math.max(2, page - delta)
    const right = Math.min(totalPages - 1, page + delta)

    pages.push(1)
    if (left > 2) pages.push('...')
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < totalPages - 1) pages.push('...')
    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  const btnBase = `
    min-w-[32px] h-8 px-2 rounded-lg text-xs font-mono font-medium
    flex items-center justify-center transition-all duration-150
    disabled:opacity-30 disabled:cursor-not-allowed
  `

  return (
    <div className={`flex items-center justify-between flex-wrap gap-3 ${className}`}>
      {/* Count */}
      <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>{start}–{end}</span>
        {' '}of{' '}
        <span style={{ color: 'var(--text-secondary)' }}>{totalItems}</span>
        {' '}records
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className={btnBase}
          style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
          aria-label="First page"
        >
          <ChevronsLeft size={13} />
        </button>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={btnBase}
          style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
          aria-label="Previous page"
        >
          <ChevronLeft size={13} />
        </button>

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="w-8 text-center text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={btnBase}
              style={
                p === page
                  ? { background: 'var(--accent-cyan)', color: 'var(--bg-base)', border: '1px solid transparent' }
                  : { border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }
              }
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={btnBase}
          style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
          aria-label="Next page"
        >
          <ChevronRight size={13} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className={btnBase}
          style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
          aria-label="Last page"
        >
          <ChevronsRight size={13} />
        </button>
      </div>
    </div>
  )
}
