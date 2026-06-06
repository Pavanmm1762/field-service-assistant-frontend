import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import { Bot } from 'lucide-react'

export function ChatWindow({ messages, isTyping, messagesEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-10">
          <div className="w-12 h-12 rounded-2xl bg-surface-700 border border-surface-600 flex items-center justify-center">
            <Bot size={22} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-sm max-w-[220px]">
            No messages yet. Upload an image or ask a question to get started.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  )
}
