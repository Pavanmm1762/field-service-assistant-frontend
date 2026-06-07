import { ImageIcon, ScanLine, Camera } from 'lucide-react'

export function ImagePreviewCard({ session }) {
  // In production this would be session.imageUrl (presigned URL)
  // We render a styled placeholder that looks like a real image card
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const hasImage = !!session.imageUrl

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-5 py-4"
        style={{ borderBottom: '1px solid var(--border-default)' }}
      >
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}
        >
          <Camera size={14} style={{ color: '#00e5ff' }} />
        </div>
        <h2 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Equipment Image
        </h2>
      </div>

      {/* Image area */}
      <div className="p-5">
        {hasImage ? (
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={`${API_BASE_URL}${session.imageUrl}`}
              alt={`${session.equipment} — ${session.issue}`}
              className="w-full object-cover"
              style={{ maxHeight: 280 }}
            />
            {/* Scan overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }}
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {session.equipment}
              </span>
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                style={{ background: 'rgba(0,229,255,0.2)', border: '1px solid rgba(0,229,255,0.4)' }}
              >
                <ScanLine size={10} style={{ color: '#00e5ff' }} />
                <span className="text-[10px] font-mono" style={{ color: '#00e5ff' }}>Analysed</span>
              </div>
            </div>
          </div>
        ) : (
          /* Placeholder */
          <div
            className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center gap-4"
            style={{
              minHeight: 200,
              background: 'var(--bg-elevated)',
              border: '1px dashed var(--border-default)',
            }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
              >
                <ImageIcon size={22} style={{ color: 'var(--text-muted)' }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-mono font-medium" style={{ color: 'var(--text-secondary)' }}>
                  No image stored
                </p>
                <p className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Image was analysed in real-time
                </p>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{
                  background: 'rgba(0,229,255,0.06)',
                  border: '1px solid rgba(0,229,255,0.15)',
                }}
              >
                <ScanLine size={11} style={{ color: '#00e5ff' }} />
                <span className="text-[11px] font-mono" style={{ color: '#00e5ff' }}>
                  AI Analysis Completed · {session.confidence}% confidence
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
