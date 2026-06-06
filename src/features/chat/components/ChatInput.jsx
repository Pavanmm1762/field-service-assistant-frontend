import { Send, Mic } from 'lucide-react'

export function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && value.trim()) onSend()
    }
  }

  return (
    <div className="flex items-end gap-2 p-3 border-t border-surface-700 bg-surface-900">
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the equipment issue..."
          disabled={disabled}
          rows={1}
          className={`
            w-full bg-surface-800 border border-surface-600 rounded-xl
            px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20
            resize-none transition-colors duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
            font-body leading-relaxed
            scrollbar-thin
          `}
          style={{ minHeight: '40px', maxHeight: '120px' }}
        />
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          className="w-9 h-9 rounded-xl border border-surface-600 text-text-muted hover:text-cyan-400 hover:border-cyan-400/30 flex items-center justify-center transition-colors"
          title="Voice input"
        >
          <Mic size={15} />
        </button>
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="w-9 h-9 rounded-xl bg-cyan-400 text-surface-950 flex items-center justify-center transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  )
}
