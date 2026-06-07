import { Bot, User, MessageSquare } from 'lucide-react'

function formatMsgTime(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function renderContent(text) {
  // Bold **text** → <strong>
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

function AssistantMessage({ message }) {
  return (
    <div className="flex items-start gap-3" style={{ animation: 'fadeUp 0.3s ease-out both' }}>
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{
          background: 'rgba(0,229,255,0.1)',
          border: '1px solid rgba(0,229,255,0.25)',
        }}
      >
        <Bot size={15} style={{ color: '#00e5ff' }} />
      </div>

      <div className="flex flex-col gap-1 max-w-[82%]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold" style={{ color: '#00e5ff' }}>
            Field Service AI
          </span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
            {formatMsgTime(message.timestamp)}
          </span>
        </div>
        <div
          className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed whitespace-pre-wrap"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
          }}
          dangerouslySetInnerHTML={{ __html: renderContent(message.content) }}
        />
      </div>
    </div>
  )
}

function UserMessage({ message }) {
  return (
    <div className="flex items-start gap-3 flex-row-reverse" style={{ animation: 'fadeUp 0.3s ease-out both' }}>
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{
          background: 'rgba(41,121,255,0.12)',
          border: '1px solid rgba(41,121,255,0.3)',
        }}
      >
        <User size={15} style={{ color: '#2979ff' }} />
      </div>

      <div className="flex flex-col gap-1 items-end max-w-[82%]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
            {formatMsgTime(message.timestamp)}
          </span>
          <span className="text-[11px] font-mono font-semibold" style={{ color: '#2979ff' }}>
            Technician
          </span>
        </div>
        <div
          className="px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed"
          style={{
            background: 'rgba(41,121,255,0.1)',
            border: '1px solid rgba(41,121,255,0.2)',
            color: 'var(--text-primary)',
          }}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}

export function ConversationTimeline({ messages }) {
  if (!messages?.length) return null

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
          <MessageSquare size={14} style={{ color: '#00e5ff' }} />
        </div>
        <div>
          <h2 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            Conversation Timeline
          </h2>
          <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {messages.length} messages in this session
          </p>
        </div>
      </div>

      {/* Messages */}
      <div 
          className="p-5 flex flex-col gap-5 overflow-y-auto"
          style={{
            maxHeight: '450px', // adjust as needed
          }}
      >
        {messages.map((msg, i) =>
          msg.role === 'assistant'
            ? <AssistantMessage key={msg.id || i} message={msg} />
            : <UserMessage key={msg.id || i} message={msg} />
        )}
      </div>
    </div>
  )
}
