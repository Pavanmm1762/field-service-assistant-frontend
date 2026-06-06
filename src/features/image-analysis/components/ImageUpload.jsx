import { useRef, useState, useCallback } from 'react'
import { Upload, Image as ImageIcon, X, ScanLine, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Spinner } from '../../../components/ui/Spinner'

export function ImageUpload({ onFile, onAnalyze, preview, file, loading, error, onClear }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(false)
      const dropped = e.dataTransfer.files[0]
      if (dropped) onFile(dropped)
    },
    [onFile]
  )

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleChange = (e) => {
    const f = e.target.files[0]
    if (f) onFile(f)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`
            relative group cursor-pointer rounded-2xl border-2 border-dashed
            transition-all duration-200 overflow-hidden
            flex flex-col items-center justify-center gap-3
            min-h-[200px] sm:min-h-[240px] px-6 py-10
            ${dragging
              ? 'border-cyan-400 bg-cyan-400/5 scale-[1.01]'
              : 'border-surface-600 hover:border-cyan-400/50 hover:bg-surface-700/40'
            }
          `}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />

          <div className={`
            relative w-16 h-16 rounded-2xl border border-surface-600 bg-surface-800
            flex items-center justify-center transition-all duration-200
            group-hover:border-cyan-400/40 group-hover:bg-surface-700
            ${dragging ? 'border-cyan-400/60 bg-surface-700 scale-110' : ''}
          `}>
            {dragging ? (
              <ScanLine size={28} className="text-cyan-400 animate-pulse" />
            ) : (
              <Upload size={24} className="text-text-muted group-hover:text-cyan-400 transition-colors" />
            )}
          </div>

          <div className="relative text-center">
            <p className="font-display font-semibold text-text-primary text-sm">
              {dragging ? 'Drop to analyze' : 'Drop equipment image here'}
            </p>
            <p className="text-text-muted text-xs mt-1">or click to browse · PNG, JPG, JPEG · max 10MB</p>
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
        /* Preview */
        <div className="relative rounded-2xl overflow-hidden border border-surface-600 bg-surface-800 group">
          <img
            src={preview}
            alt="Equipment preview"
            className="w-full object-cover max-h-[280px]"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 to-transparent" />

          {/* File info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-surface-800/80 border border-surface-600 flex items-center justify-center">
                <ImageIcon size={14} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-mono text-text-primary leading-none truncate max-w-[180px]">{file.name}</p>
                <p className="text-[10px] text-text-muted mt-0.5">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            {!loading && (
              <button
                onClick={(e) => { e.stopPropagation(); onClear() }}
                className="w-7 h-7 rounded-lg bg-surface-800/80 border border-surface-600 text-text-muted hover:text-red-400 hover:border-red-400/30 flex items-center justify-center transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Scan animation while loading */}
          {loading && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
                style={{ animation: 'scan 1.5s linear infinite' }}
              />
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-up">
          <AlertCircle size={14} className="text-red-400 shrink-0" />
          <p className="text-red-400 text-xs font-mono">{error}</p>
        </div>
      )}

      {/* Analyze button */}
      {preview && !loading && (
        <button
          onClick={onAnalyze}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <ScanLine size={16} />
          Run Diagnostic Analysis
        </button>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-3 py-3 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
          <Spinner size="sm" />
          <span className="text-sm font-mono text-cyan-400">Analyzing equipment...</span>
        </div>
      )}
    </div>
  )
}
