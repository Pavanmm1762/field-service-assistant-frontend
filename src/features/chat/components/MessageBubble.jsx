import { Bot, User } from 'lucide-react'

const BUBBLE_STYLES = {
  user: {
    avatar: {
      background: 'rgba(41,121,255,0.12)',
      border:     '1px solid rgba(41,121,255,0.3)',
    },
    icon: { color: 'var(--accent-blue)' },
    bubble: {
      background: 'rgba(41,121,255,0.1)',
      border:     '1px solid rgba(41,121,255,0.2)',
      color:      'var(--text-primary)',
      borderRadius: '1rem 0.25rem 1rem 1rem',
    },
  },
  assistant: {
    avatar: {
      background: 'rgba(0,229,255,0.1)',
      border:     '1px solid rgba(0,229,255,0.2)',
    },
    icon: { color: 'var(--accent-cyan)' },
    bubble: {
      background: 'var(--bg-elevated)',
      border:     '1px solid var(--border-default)',
      color:      'var(--text-primary)',
      borderRadius: '0.25rem 1rem 1rem 1rem',
    },
  },
  error: {
    avatar: {
      background: 'rgba(0,229,255,0.1)',
      border:     '1px solid rgba(0,229,255,0.2)',
    },
    icon: { color: 'var(--accent-cyan)' },
    bubble: {
      background: 'rgba(255,82,82,0.08)',
      border:     '1px solid rgba(255,82,82,0.25)',
      color:      'var(--accent-red)',
      borderRadius: '0.25rem 1rem 1rem 1rem',
    },
  },
}

export function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  const time = message.timestamp instanceof Date
    ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : typeof message.timestamp === 'string'
      ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : ''

  const variant = isUser ? 'user' : message.isError ? 'error' : 'assistant'
  const styles  = BUBBLE_STYLES[variant]

  return (
    <div className={`flex gap-2.5 animate-fade-up ${isUser ? 'flex-row-reverse' : ''}`}>

      {/* Avatar */}
      <div
        className="shrink-0 w-7 h-7 rounded-xl flex items-center justify-center mt-0.5 transition-colors duration-300"
        style={styles.avatar}
      >
        {isUser
          ? <User size={13} style={styles.icon} />
          : <Bot  size={13} style={styles.icon} />
        }
      </div>

      {/* Bubble + timestamp */}
      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className="px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300"
          style={styles.bubble}
        >
          {message.content.message || message.content}
          {message.content.sources && message.content.sources.length > 0 && (
            <div className="mt-2 text-xs text-text-muted">
              <strong>Sources:</strong>
              <ul className="list-disc list-inside">
                {message.content.sources.map((source, index) => (
                  <li key={index}>
                    <span className="font-medium">
                      {source.filename}
                    </span>

                    {source.equipment && (
                      <span className="ml-1 text-text-muted">
                        ({source.equipment})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
        <span
          className="text-[10px] font-mono px-1 transition-colors duration-300"
          style={{ color: 'var(--text-muted)' }}
        >
          {time}
        </span>
      </div>

    </div>
  )
}
