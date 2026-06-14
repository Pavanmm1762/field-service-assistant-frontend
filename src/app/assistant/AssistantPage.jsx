import { useEffect } from 'react'
import { ScanLine, MessageSquare, Lightbulb, ChevronRight } from 'lucide-react'
import { ImageUpload }    from '../../features/image-analysis/components/ImageUpload'
import { AnalysisResult } from '../../features/image-analysis/components/AnalysisResult'
import { ChatWindow }     from '../../features/chat/components/ChatWindow'
import { ChatInput }      from '../../features/chat/components/ChatInput'
import { useImageAnalysis } from '../../features/image-analysis/hooks/useImageAnalysis'
import { useChat }          from '../../features/chat/hooks/useChat'
import { useAppContext }    from '../../store/AppContext'

const QUICK_PROMPTS = [
  'How do I replace an Ethernet port?',
  'What tools do I need on site?',
  'Escalation procedure for hardware faults?',
]

const TIPS = [
  'Ensure good lighting when capturing equipment images',
  'Include visible port/connector areas in frame',
  'Use the chat to ask follow-up questions after analysis',
]

// ─── Badge variant styles using CSS variables ─────────────────────────────
const BADGE_VARIANTS = {
  default: {
    color:      'var(--text-muted)',
    background: 'var(--bg-elevated)',
    border:     '1px solid var(--border-default)',
  },
  green: {
    color:      'var(--accent-green)',
    background: 'rgba(105,240,174,0.08)',
    border:     '1px solid rgba(105,240,174,0.2)',
  },
  cyan: {
    color:      'var(--accent-cyan)',
    background: 'rgba(0,229,255,0.08)',
    border:     '1px solid rgba(0,229,255,0.2)',
  },
}

// ─── SectionHeader ────────────────────────────────────────────────────────
function SectionHeader({ icon, title, badge, badgeVariant = 'default', className = '' }) {
  const badgeStyle = BADGE_VARIANTS[badgeVariant] ?? BADGE_VARIANTS.default

  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-300"
          style={{
            background: 'var(--bg-elevated)',
            border:     '1px solid var(--border-default)',
          }}
        >
          {icon}
        </div>
        <span
          className="font-display font-semibold text-sm transition-colors duration-300"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </span>
      </div>

      {badge && (
        <span
          className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-md transition-colors duration-300"
          style={badgeStyle}
        >
          {badge}
        </span>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function AssistantPage() {
  const { selectFile, clearFile, analyze, preview, file, result, loading, error } = useImageAnalysis()
  const { messages, input, setInput, isTyping, send, messagesEndRef } = useChat()
  const { setAnalysisResult } = useAppContext()

  useEffect(() => {
    if (!result) return

    setAnalysisResult(result)

   if (
      result.equipment !== "Unknown" &&
      result.confidence > 0
    ) {

      if (result.fault_detected) {

        send(
          `What should I do to fix the detected issue on this ${result.equipment}?`
        )

      } else {
 
      }
    }
  }, [result])

  return (
    <div className="mx-auto px-4 sm:px-6 py-6" style={{
       background: 'var(--bg-raised)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── Left column: Upload + Analysis + Tips ── */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* Upload card */}
          <div
            className="rounded-2xl p-5 transition-colors duration-300"
            style={{
              background: 'var(--bg-card)',
              border:     '1px solid var(--border-default)',
              boxShadow:  'var(--shadow-card)',
            }}
          >
            <SectionHeader
              icon={<ScanLine size={15} style={{ color: 'var(--accent-cyan)' }} />}
              title="Equipment Diagnostics"
              badge="Upload"
            />
            <ImageUpload
              onFile={selectFile}
              onAnalyze={analyze}
              onClear={clearFile}
              preview={preview}
              file={file}
              loading={loading}
              error={error}
            />
          </div>

          {/* Analysis result */}
          {result && <AnalysisResult result={result} />}

          {/* Field guide tips */}
          {!result && (
            <div
              className="rounded-2xl p-5 transition-colors duration-300"
              style={{
                background: 'var(--bg-card)',
                border:     '1px solid var(--border-default)',
                boxShadow:  'var(--shadow-card)',
              }}
            >
              <SectionHeader
                icon={<Lightbulb size={15} style={{ color: 'var(--accent-amber)' }} />}
                title="Field Guide"
                badge="Tips"
              />
              <div className="flex flex-col gap-3 mt-1">
                {TIPS.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm transition-colors duration-300">
                    <span
                      className="font-mono text-xs mt-0.5 shrink-0 font-semibold"
                      style={{ color: 'var(--accent-cyan)' }}
                    >
                      0{i + 1}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right column: Chat ── */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            className="flex flex-col h-[580px] lg:h-[700px] overflow-hidden rounded-2xl transition-colors duration-300"
            style={{
              background: 'var(--bg-card)',
              border:     '1px solid var(--border-default)',
              boxShadow:  'var(--shadow-card)',
            }}
          >
            {/* Chat header */}
            <div
              className="flex items-center justify-between px-4 py-3 transition-colors duration-300"
              style={{ borderBottom: '1px solid var(--border-default)' }}
            >
              <SectionHeader
                icon={<MessageSquare size={15} style={{ color: 'var(--accent-cyan)' }} />}
                title="AI Field Assistant"
                badge="Live"
                badgeVariant="green"
                className="mb-0"
              />
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--accent-green)' }}
                />
                <span
                  className="text-[10px] font-mono transition-colors duration-300"
                  style={{ color: 'var(--accent-green)' }}
                >
                  Ready
                </span>
              </div>
            </div>

            {/* Messages */}
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />

            {/* Quick prompts */}
            <div
              className="px-4 py-2 flex gap-2 overflow-x-auto transition-colors duration-300"
              style={{ borderTop: '1px solid var(--border-default)' }}
            >
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => send(prompt)}
                  disabled={isTyping}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-150 disabled:opacity-40"
                  style={{
                    border:     '1px solid var(--border-default)',
                    color:      'var(--text-muted)',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color       = 'var(--accent-cyan)'
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.35)'
                    e.currentTarget.style.background  = 'rgba(0,229,255,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color       = 'var(--text-muted)'
                    e.currentTarget.style.borderColor = 'var(--border-default)'
                    e.currentTarget.style.background  = 'transparent'
                  }}
                >
                  {prompt}
                  <ChevronRight size={10} />
                </button>
              ))}
            </div>

            {/* Input */}
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => send()}
              disabled={isTyping}
            />
          </div>
        </div>

      </div>
    </div>
  )
}
