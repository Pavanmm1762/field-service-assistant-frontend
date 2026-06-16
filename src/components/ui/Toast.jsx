import { useState, useCallback, useEffect } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

// ─── Simple inline toast (no library needed) ─────────────────────────────

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const push = useCallback((message, type = 'success') => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3800)
  }, [])

  const dismiss = useCallback(id => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const success = useCallback(msg => push(msg, 'success'), [push])
  const error   = useCallback(msg => push(msg, 'error'),   [push])

  return { toasts, dismiss, success, error }
}

export function ToastContainer({ toasts, dismiss }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <Toast key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  )
}

function Toast({ toast, onDismiss }) {
  const isSuccess = toast.type === 'success'
  const accent    = isSuccess ? '#69f0ae' : '#ff5252'

  return (
    <div
      className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl max-w-sm shadow-2xl"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${accent}35`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px ${accent}20`,
        animation: 'slideIn 0.2s ease-out both',
      }}
    >
      {isSuccess
        ? <CheckCircle2 size={15} style={{ color: accent, shrink: 0 }} />
        : <XCircle      size={15} style={{ color: accent, shrink: 0 }} />
      }
      <span className="text-sm font-mono flex-1" style={{ color: 'var(--text-primary)' }}>
        {toast.message}
      </span>
      <button
        onClick={onDismiss}
        className="w-5 h-5 flex items-center justify-center rounded-md transition-colors"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <X size={11} />
      </button>
    </div>
  )
}
