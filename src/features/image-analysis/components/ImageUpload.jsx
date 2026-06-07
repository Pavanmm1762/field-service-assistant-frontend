import { useRef, useState, useCallback } from 'react'
import { Upload, Image as ImageIcon, X, ScanLine, AlertCircle } from 'lucide-react'
import { Spinner } from '../../../components/ui/Spinner'

export function ImageUpload({ onFile, onAnalyze, preview, file, loading, error, onClear }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [iconHovered, setIconHovered] = useState(false)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) onFile(dropped)
  }, [onFile])

  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = ()  => setDragging(false)

  const handleChange = (e) => {
    const f = e.target.files[0]
    if (f) onFile(f)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── Drop zone ── */}
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          onMouseEnter={() => setIconHovered(true)}
          onMouseLeave={() => setIconHovered(false)}
          className="relative cursor-pointer rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-3 min-h-[200px] sm:min-h-[240px] px-6 py-10 transition-all duration-200"
          style={{
            border:     `2px dashed ${dragging ? 'var(--accent-cyan)' : 'var(--border-strong)'}`,
            background: dragging
              ? 'rgba(0,229,255,0.04)'
              : 'var(--bg-elevated)',
            transform: dragging ? 'scale(1.01)' : 'scale(1)',
          }}
        >
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />

          {/* Icon box */}
          <div
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200"
            style={{
              background: dragging || iconHovered ? 'var(--bg-hover)' : 'var(--bg-card)',
              border: `1px solid ${dragging ? 'rgba(0,229,255,0.5)' : iconHovered ? 'rgba(0,229,255,0.35)' : 'var(--border-default)'}`,
              transform: dragging ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {dragging
              ? <ScanLine size={28} className="animate-pulse" style={{ color: 'var(--accent-cyan)' }} />
              : <Upload   size={24} style={{ color: iconHovered ? 'var(--accent-cyan)' : 'var(--text-muted)', transition: 'color 0.15s' }} />
            }
          </div>

          {/* Labels */}
          <div className="relative text-center">
            <p className="font-display font-semibold text-sm transition-colors duration-200"
               style={{ color: 'var(--text-primary)' }}>
              {dragging ? 'Drop to analyze' : 'Drop equipment image here'}
            </p>
            <p className="text-xs mt-1 transition-colors duration-200"
               style={{ color: 'var(--text-muted)' }}>
              or click to browse · PNG, JPG, JPEG · max 10MB
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            onChange={handleChange}
            className="hidden"
          />
        </div>

      ) : (
        /* ── Image preview ── */
        <div
          className="relative rounded-2xl overflow-hidden group"
          style={{ border: '1px solid var(--border-default)' }}
        >
          <img
            src={preview}
            alt="Equipment preview"
            className="w-full object-cover max-h-[280px]"
          />

          {/* Dark gradient overlay — always visible so text stays readable over any image */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }}
          />

          {/* File info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <ImageIcon size={14} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <div>
                <p className="text-xs font-mono leading-none truncate max-w-[180px]"
                   style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {file.name}
                </p>
                <p className="text-[10px] mt-0.5"
                   style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>

            {!loading && (
              <button
                onClick={(e) => { e.stopPropagation(); onClear() }}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-red)'; e.currentTarget.style.borderColor = 'rgba(255,82,82,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Scan line animation during analysis */}
          {loading && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute left-0 right-0 h-0.5 opacity-80"
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
                  animation: 'scan 1.5s linear infinite',
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Validation error ── */}
      {error && (
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl animate-fade-up"
          style={{ background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.25)' }}
        >
          <AlertCircle size={14} className="shrink-0" style={{ color: 'var(--accent-red)' }} />
          <p className="text-xs font-mono" style={{ color: 'var(--accent-red)' }}>{error}</p>
        </div>
      )}

      {/* ── Analyze CTA ── */}
      {preview && !loading && (
        <button
          onClick={onAnalyze}
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm transition-all duration-150 active:scale-95"
          style={{
            background: 'var(--accent-cyan)',
            color:      'var(--bg-base)',
          }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
        >
          <ScanLine size={16} />
          Run Diagnostic Analysis
        </button>
      )}

      {/* ── Loading state ── */}
      {loading && (
        <div
          className="flex items-center justify-center gap-3 py-3 rounded-xl"
          style={{
            background: 'rgba(0,229,255,0.05)',
            border:     '1px solid rgba(0,229,255,0.18)',
          }}
        >
          <Spinner size="sm" />
          <span className="text-sm font-mono" style={{ color: 'var(--accent-cyan)' }}>
            Analyzing equipment…
          </span>
        </div>
      )}

    </div>
  )
}