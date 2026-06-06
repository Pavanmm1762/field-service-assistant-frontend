import { useEffect } from 'react'
import { ScanLine, MessageSquare, Lightbulb, ChevronRight } from 'lucide-react'
import { ImageUpload } from '../../features/image-analysis/components/ImageUpload'
import { AnalysisResult } from '../../features/image-analysis/components/AnalysisResult'
import { ChatWindow } from '../../features/chat/components/ChatWindow'
import { ChatInput } from '../../features/chat/components/ChatInput'
import { useImageAnalysis } from '../../features/image-analysis/hooks/useImageAnalysis'
import { useChat } from '../../features/chat/hooks/useChat'
import { useAppContext } from '../../store/AppContext'

const QUICK_PROMPTS = [
  'How do I replace an Ethernet port?',
  'What tools do I need on site?',
  'Escalation procedure for hardware faults?',
]

export default function AssistantPage() {
  const { selectFile, clearFile, analyze, preview, file, result, loading, error } = useImageAnalysis()
  const { messages, input, setInput, isTyping, send, messagesEndRef, clearMessages, } = useChat()
  const { setAnalysisResult } = useAppContext()

  useEffect(() => {
    if (!result) return

    setAnalysisResult(result)

    if (
      result.equipment !== "Unknown" &&
      result.confidence > 0
    ) {
      send(
        `What should I do to fix the detected issue on this ${result.equipment}?`
      )
    }
  }, [result])

  const handleClear = () => {
    clearFile()
    clearMessages()
    setAnalysisResult(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column — Upload + Analysis */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Upload Card */}
          <div className="card p-5">
            <SectionHeader
              icon={<ScanLine size={15} className="text-cyan-400" />}
              title="Equipment Diagnostics"
              badge="Upload"
            />
            <ImageUpload
              onFile={selectFile}
              onAnalyze={analyze}
              onClear={handleClear}
              preview={preview}
              file={file}
              loading={loading}
              error={error}
            />
          </div>

          {/* Analysis Result */}
          {result && (
            <div>
              <AnalysisResult result={result} />
            </div>
          )}

          {/* Quick Tips */}
          {!result && (
            <div className="card p-5">
              <SectionHeader
                icon={<Lightbulb size={15} className="text-amber-400" />}
                title="Field Guide"
                badge="Tips"
              />
              <div className="space-y-2 mt-3">
                {[
                  'Ensure good lighting when capturing equipment images',
                  'Include visible port/connector areas in frame',
                  'Use the chat to ask follow-up questions after analysis',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <span className="text-cyan-400 font-mono text-xs mt-0.5 shrink-0">0{i + 1}</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column — Chat */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="card flex flex-col h-[580px] lg:h-[700px] overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
              <SectionHeader
                icon={<MessageSquare size={15} className="text-cyan-400" />}
                title="AI Field Assistant"
                badge="Live"
                badgeVariant="green"
              />
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-mono text-green-400">Ready</span>
              </div>
            </div>

            {/* Messages */}
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />

            {/* Quick prompts */}
            <div className="px-4 py-2 border-t border-surface-700 flex gap-2 overflow-x-auto scrollbar-thin">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => send(prompt)}
                  disabled={isTyping}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-surface-600 text-text-muted hover:text-cyan-400 hover:border-cyan-400/30 text-[11px] font-mono transition-colors duration-150 disabled:opacity-40"
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

function SectionHeader({ icon, title, badge, badgeVariant = 'default' }) {
  const variantStyles = {
    default: 'text-text-muted bg-surface-700 border border-surface-600',
    green: 'text-green-400 bg-green-400/10 border border-green-400/20',
    cyan: 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20',
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-surface-700 border border-surface-600 flex items-center justify-center">
          {icon}
        </div>
        <span className="font-display font-semibold text-sm text-text-primary">{title}</span>
      </div>
      {badge && (
        <span className={`text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-md ${variantStyles[badgeVariant]}`}>
          {badge}
        </span>
      )}
    </div>
  )
}
