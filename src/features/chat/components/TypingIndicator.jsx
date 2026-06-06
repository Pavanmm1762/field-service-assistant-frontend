import { Bot } from 'lucide-react'

export function TypingIndicator() {
  return (
    <div className="flex gap-2.5 animate-fade-up">
      <div className="shrink-0 w-7 h-7 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mt-0.5">
        <Bot size={13} className="text-cyan-400" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-surface-700 border border-surface-600 flex items-center gap-1.5">
        {[0, 0.15, 0.3].map((delay, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{ animation: `typing 1.2s steps(1) ${delay}s infinite` }}
          />
        ))}
      </div>
    </div>
  )
}
