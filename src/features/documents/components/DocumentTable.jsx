import { FileText, Eye, RefreshCw, Trash2, FileWarning } from 'lucide-react'
import { Spinner } from '../../../components/ui/Spinner'

export const STATUS_STYLE = {
  indexed: { bg: 'rgba(105,240,174,0.1)', color: '#69f0ae', border: 'rgba(105,240,174,0.25)', label: 'Indexed' },
  pending: { bg: 'rgba(255,171,64,0.1)',  color: '#ffab40', border: 'rgba(255,171,64,0.25)',  label: 'Pending' },
  failed:  { bg: 'rgba(255,82,82,0.1)',   color: '#ff5252', border: 'rgba(255,82,82,0.25)',   label: 'Failed'  },
}

function StatusChip({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.pending
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  )
}

function ActionBtn({ onClick, disabled, title, children, danger }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ border: '1px solid var(--border-default)', background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.color = danger ? 'var(--accent-red)' : 'var(--accent-cyan)'
          e.currentTarget.style.borderColor = danger ? 'rgba(255,82,82,0.4)' : 'rgba(0,229,255,0.35)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--text-muted)'
        e.currentTarget.style.borderColor = 'var(--border-default)'
      }}
    >
      {disabled ? <Spinner size="sm" /> : children}
    </button>
  )
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

const COL_HEADERS = ['Filename', 'Equipment', 'Chunks', 'Status', 'Created At', 'Actions']

export function DocumentTable({ records, loading, onView, onReindex, onDelete, isReindexing, isDeleting }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Spinner size="lg" />
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Loading documents…</p>
      </div>
    )
  }

  if (!records.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
        >
          <FileWarning size={22} style={{ color: 'var(--text-muted)' }} />
        </div>
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>No documents match your filters</p>
      </div>
    )
  }

  return (
    <>
      {/* ── Desktop table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
              {COL_HEADERS.map(h => (
                <th
                  key={h}
                  className={`px-4 py-3 text-left text-[10px] font-mono font-medium tracking-widest uppercase ${h === 'Actions' ? 'text-right' : ''}`}
                  style={{ color: 'var(--text-muted)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((doc, idx) => (
              <tr
                key={doc.id}
                className="group transition-colors duration-100"
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  animation: `fadeUp 0.3s ease-out ${idx * 25}ms both`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Filename */}
                <td className="px-4 py-3 max-w-[220px]">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}
                    >
                      <FileText size={12} style={{ color: 'var(--accent-cyan)' }} />
                    </div>
                    <span
                      className="text-xs font-mono truncate"
                      style={{ color: 'var(--text-primary)', maxWidth: 180 }}
                      title={doc.filename}
                    >
                      {doc.filename}
                    </span>
                  </div>
                </td>

                {/* Equipment */}
                <td className="px-4 py-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {doc.equipment}
                </td>

                {/* Chunk count */}
                <td className="px-4 py-3 text-xs font-mono text-center" style={{ color: doc.chunk_count > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {doc.chunk_count > 0 ? doc.chunk_count.toLocaleString() : '—'}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <StatusChip status={doc.status} />
                </td>

                {/* Created at */}
                <td className="px-4 py-3 text-xs font-mono whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                  {formatDate(doc.created_at)}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <ActionBtn onClick={() => onView(doc)} title="View details">
                      <Eye size={13} />
                    </ActionBtn>
                    <ActionBtn
                      onClick={() => onReindex(doc.id)}
                      disabled={isReindexing(doc.id)}
                      title="Reindex document"
                    >
                      <RefreshCw size={12} />
                    </ActionBtn>
                    <ActionBtn
                      onClick={() => onDelete(doc.id)}
                      disabled={isDeleting(doc.id)}
                      title="Delete document"
                      danger
                    >
                      <Trash2 size={12} />
                    </ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards ── */}
      <div className="md:hidden flex flex-col gap-3">
        {records.map((doc, idx) => (
          <div
            key={doc.id}
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              animation: `fadeUp 0.3s ease-out ${idx * 25}ms both`,
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}
                >
                  <FileText size={14} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <span className="text-xs font-mono truncate" style={{ color: 'var(--text-primary)' }}>
                  {doc.filename}
                </span>
              </div>
              <StatusChip status={doc.status} />
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              <span>{doc.equipment}</span>
              <span>·</span>
              <span>{doc.chunk_count > 0 ? `${doc.chunk_count} chunks` : 'Not indexed'}</span>
              <span>·</span>
              <span>{formatDate(doc.created_at)}</span>
            </div>

            <div className="flex items-center gap-2 pt-1" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <ActionBtn onClick={() => onView(doc)} title="View">
                <Eye size={13} />
              </ActionBtn>
              <ActionBtn onClick={() => onReindex(doc.id)} disabled={isReindexing(doc.id)} title="Reindex">
                <RefreshCw size={12} />
              </ActionBtn>
              <ActionBtn onClick={() => onDelete(doc.id)} disabled={isDeleting(doc.id)} title="Delete" danger>
                <Trash2 size={12} />
              </ActionBtn>
              <span className="text-[10px] font-mono ml-auto" style={{ color: 'var(--text-muted)' }}>
                ID: {doc.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
