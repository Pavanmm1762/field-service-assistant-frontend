import { useState, useCallback } from 'react'
import {
  FolderOpen, RefreshCw, RotateCcw,
  Download, Search,
} from 'lucide-react'
import { DocumentStatsCards }  from '../../features/documents/components/DocumentStatsCards'
import { DocumentFilters }     from '../../features/documents/components/DocumentFilters'
import { DocumentTable }       from '../../features/documents/components/DocumentTable'
import { ViewDocumentDialog }  from '../../features/documents/components/ViewDocumentDialog'
import { Pagination }          from '../../components/ui/Pagination'
import { Spinner }             from '../../components/ui/Spinner'
import { ToastContainer, useToast } from '../../components/ui/Toast'
import {
  useDocuments,
  useDocumentStats,
  useDocumentActions,
} from '../../features/documents/hooks/useDocuments'
import { fetchDocument } from '../../features/documents/api/documentsApi'

export default function DocumentsPage() {
  const toast = useToast()

  // List + filters
  const {
    records, total, totalPages, page, setPage,
    loading, error, filters, updateFilter, clearFilters, refresh, pageSize,
  } = useDocuments()

  // Stats
  const { stats, loading: statsLoading, refresh: refreshStats } = useDocumentStats()

  // Actions (sync / reindex / delete)
  const {
    isSyncing, isReindexingAll, isReindexing, isDeleting,
    runSync, runReindexAll, runReindex, runDelete,
  } = useDocumentActions({
    onSuccess: (msg) => {
      toast.success(msg)
      refresh()
      refreshStats()
    },
  })

  // View dialog
  const [viewDoc,     setViewDoc]     = useState(null)   // the doc object for the dialog
  const [viewLoading, setViewLoading] = useState(false)

  const handleView = useCallback(async (doc) => {
    setViewDoc(doc)          // open dialog immediately with row data
    setViewLoading(true)
    try {
      const full = await fetchDocument(doc.id)
      setViewDoc(full)
    } catch {
      // keep what we have from the row
    } finally {
      setViewLoading(false)
    }
  }, [])

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Delete this document? This cannot be undone.')) return
    await runDelete(id)
    refresh()
    refreshStats()
  }, [runDelete, refresh, refreshStats])

  const hasFilters = filters.search || filters.equipment || filters.status

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 py-8 flex flex-col gap-7" style={{ background: 'var(--bg-raised)' }}>

        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}
              >
                <FolderOpen size={16} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h1
                className="font-display font-bold text-2xl tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Documents Management
              </h1>
            </div>
            <p className="text-sm ml-[42px]" style={{ color: 'var(--text-secondary)' }}>
              Manage manuals and knowledge base documents
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-[42px] sm:ml-0">
            <ActionButton
              onClick={runSync}
              loading={isSyncing}
              icon={<RefreshCw size={13} />}
              label="Sync Documents"
              accent="var(--accent-cyan)"
            />
            <ActionButton
              onClick={runReindexAll}
              loading={isReindexingAll}
              icon={<RotateCcw size={13} />}
              label="Reindex All"
            />
          </div>
        </div>

        {/* ── Stats ── */}
        <DocumentStatsCards stats={stats} loading={statsLoading} />

        {/* ── Filters ── */}
        <DocumentFilters filters={filters} onFilter={updateFilter} onClear={clearFilters} />

        {/* ── Results count ── */}
        {!loading && (
          <div className="flex items-center justify-between -mt-2">
            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              Showing{' '}
              <span style={{ color: 'var(--text-secondary)' }}>{records.length}</span>
              {' '}of{' '}
              <span style={{ color: 'var(--text-secondary)' }}>{total}</span>
              {' '}documents
            </p>
            {hasFilters && (
              <p className="text-xs font-mono" style={{ color: 'var(--accent-cyan)' }}>Filters active</p>
            )}
          </div>
        )}

        {/* ── Table card ── */}
        <div
          className="rounded-2xl overflow-hidden transition-colors duration-300"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
        >
          {error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-sm font-mono" style={{ color: 'var(--accent-red)' }}>{error}</p>
              <button
                onClick={refresh}
                className="text-xs font-mono px-4 py-2 rounded-xl transition-colors"
                style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
              >
                Try again
              </button>
            </div>
          ) : (
            <DocumentTable
              records={records}
              loading={loading}
              onView={handleView}
              onReindex={async (id) => { await runReindex(id); refresh() }}
              onDelete={handleDelete}
              isReindexing={isReindexing}
              isDeleting={isDeleting}
            />
          )}

          {/* Pagination footer */}
          {!loading && !error && total > pageSize && (
            <div
              className="px-5 py-4"
              style={{ borderTop: '1px solid var(--border-default)' }}
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

      </div>

      {/* ── View dialog ── */}
      {viewDoc && (
        <ViewDocumentDialog
          doc={viewDoc}
          loading={viewLoading}
          onClose={() => { setViewDoc(null); setViewLoading(false) }}
        />
      )}

      {/* ── Toast notifications ── */}
      <ToastContainer toasts={toast.toasts} dismiss={toast.dismiss} />
    </>
  )
}

// ─── Shared action button ─────────────────────────────────────────────────
function ActionButton({ onClick, loading, icon, label, accent }) {
  const isPrimary = !!accent
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      style={isPrimary
        ? { background: 'var(--accent-cyan)', color: 'var(--bg-base)' }
        : { border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }
      }
      onMouseEnter={e => {
        if (!loading) {
          if (isPrimary) e.currentTarget.style.filter = 'brightness(1.1)'
          else { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }
        }
      }}
      onMouseLeave={e => {
        if (isPrimary) e.currentTarget.style.filter = 'brightness(1)'
        else { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }
      }}
    >
      {loading ? <Spinner size="sm" /> : icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
