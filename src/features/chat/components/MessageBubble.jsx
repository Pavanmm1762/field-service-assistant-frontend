import { Bot, User } from 'lucide-react'

export function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  const time = message.timestamp instanceof Date
    ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <div
      className={`flex gap-2.5 animate-fade-up ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`
        shrink-0 w-7 h-7 rounded-xl border flex items-center justify-center mt-0.5
        ${isUser
          ? 'bg-blue-500/10 border-blue-500/30'
          : 'bg-cyan-400/10 border-cyan-400/20'
        }
      `}>
        {isUser
          ? <User size={13} className="text-blue-400" />
          : <Bot size={13} className="text-cyan-400" />
        }
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`
          px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? 'bg-blue-500/15 border border-blue-500/20 text-text-primary rounded-tr-sm'
            : message.isError
              ? 'bg-red-500/10 border border-red-500/20 text-red-300 rounded-tl-sm'
              : 'bg-surface-700 border border-surface-600 text-text-primary rounded-tl-sm'
          }
        `}>
          {message.content}
        </div>
        <span className="text-[10px] font-mono text-text-muted px-1">{time}</span>
      </div>
    </div>
  )
}
