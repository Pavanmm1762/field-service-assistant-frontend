import { useEffect, useRef } from 'react'
import {
  X, FileText, Cpu, Hash, FolderOpen,
  Activity, Layers, Calendar, RefreshCw, ExternalLink,
} from 'lucide-react'
import { Spinner } from '../../../components/ui/Spinner'
import { STATUS_STYLE } from './DocumentTable'

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) +
    ' at ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function DetailRow({ icon: Icon, accent = 'var(--accent-cyan)', label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <Icon size={11} style={{ color: accent }} />
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      </div>
      <div className="pl-4">
        {children}
      </div>
    </div>
  )
}

export function ViewDocumentDialog({ doc, loading, onClose }) {
  const overlayRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Trap body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleOverlayClick = e => { if (e.target === overlayRef.current) onClose() }

  const statusStyle = STATUS_STYLE[doc?.status] || STATUS_STYLE.pending

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: 'fadeUp 0.2s ease-out both',
      }}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* ── Dialog header ── */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
          style={{
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--bg-card)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}
            >
              <FileText size={14} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div>
              <h2 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                Document Details
              </h2>
              {doc && (
                <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {doc.id}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ border: '1px solid var(--border-default)', color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
          >
            <X size={13} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Spinner size="lg" />
              <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Loading document…</p>
            </div>
          ) : !doc ? (
            <p className="text-sm font-mono text-center py-8" style={{ color: 'var(--accent-red)' }}>
              Document not found
            </p>
          ) : (
            <div className="flex flex-col gap-5">

              {/* Status bar at top */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: `${statusStyle.color}0d`, border: `1px solid ${statusStyle.border}` }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: statusStyle.color }} />
                  <span className="text-xs font-mono font-semibold" style={{ color: statusStyle.color }}>
                    {statusStyle.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                  {doc.chunk_count > 0 ? `${doc.chunk_count.toLocaleString()} chunks indexed` : 'Not indexed'}
                </span>
              </div>

              {/* Two-column detail grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <DetailRow icon={FileText} label="Filename">
                  <span
                    className="text-sm font-mono break-all leading-relaxed"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {doc.filename}
                  </span>
                </DetailRow>

                <DetailRow icon={Cpu} accent="#2979ff" label="Equipment">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {doc.equipment}
                  </span>
                </DetailRow>

                <DetailRow icon={Layers} accent="#a78bfa" label="Chunk Count">
                  <span className="font-display font-bold text-xl leading-none" style={{ color: 'var(--text-primary)' }}>
                    {doc.chunk_count > 0 ? doc.chunk_count.toLocaleString() : '—'}
                  </span>
                </DetailRow>

                <DetailRow icon={Activity} accent={statusStyle.color} label="Status">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold"
                    style={{ background: `${statusStyle.color}14`, border: `1px solid ${statusStyle.border}`, color: statusStyle.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusStyle.color }} />
                    {statusStyle.label}
                  </span>
                </DetailRow>

              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

              {/* File path */}
              <DetailRow icon={FolderOpen} accent="#ffab40" label="File Path">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
                >
                  <span className="text-xs font-mono break-all flex-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {doc.file_path || '—'}
                  </span>
                  {doc.file_path && (
                    <ExternalLink size={11} style={{ color: 'var(--text-muted)', shrink: 0 }} />
                  )}
                </div>
              </DetailRow>

              {/* Checksum */}
              <DetailRow icon={Hash} accent="#8a9ab5" label="Checksum">
                <div
                  className="px-3 py-2 rounded-xl"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
                >
                  <span className="text-xs font-mono break-all" style={{ color: 'var(--text-secondary)' }}>
                    {doc.checksum || '—'}
                  </span>
                </div>
              </DetailRow>

              <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailRow icon={Calendar} accent="#8a9ab5" label="Created Date">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{formatDate(doc.created_at)}</span>
                </DetailRow>
                <DetailRow icon={RefreshCw} accent="#8a9ab5" label="Updated Date">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{formatDate(doc.updated_at)}</span>
                </DetailRow>
              </div>

            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="sticky bottom-0 px-5 py-4 flex justify-end"
          style={{ borderTop: '1px solid var(--border-default)', background: 'var(--bg-card)' }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-mono font-medium transition-all duration-150 active:scale-95"
            style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
