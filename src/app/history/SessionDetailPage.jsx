import { useSession } from '../../features/history/hooks/useHistory'
import { SessionHeader }        from '../../features/history/components/SessionHeader'
import { AnalysisDetails }      from '../../features/history/components/AnalysisDetails'
import { ConversationTimeline } from '../../features/history/components/ConversationTimeline'
import { SessionSidePanel }     from '../../features/history/components/SessionSidePanel'
import { ImagePreviewCard }     from '../../features/history/components/ImagePreviewCard'
import { Spinner } from '../../components/ui/Spinner'
import { AlertCircle } from 'lucide-react'

export default function SessionDetailPage({ id, onBack }) {
  const { session, loading, error } = useSession(id)

  if (loading) {
    return (
      <div className="mx-auto px-4 sm:px-6 py-20 flex flex-col items-center gap-4" style={{ background: 'var(--bg-raised)' }}>
        <Spinner size="lg" />
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Loading session…</p>
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="mx-auto px-4 sm:px-6 py-20 flex flex-col items-center gap-4" style={{ background: 'var(--bg-raised)' }}>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.3)' }}
        >
          <AlertCircle size={22} style={{ color: '#ff5252' }} />
        </div>
        <p className="text-sm font-mono" style={{ color: '#ff5252' }}>{error || 'Session not found'}</p>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl text-sm font-mono transition-colors"
          style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
        >
          ← Back to History
        </button>
      </div>
    )
  }

  return (
    <div
      className="mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6"
      style={{ animation: 'fadeUp 0.35s ease-out both', background: 'var(--bg-raised)' }}
    >
      {/* Session header card */}
      <SessionHeader session={session} onBack={onBack} />

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left/Main column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Analysis details */}
          <AnalysisDetails session={session} />

          {/* Equipment image */}
          <ImagePreviewCard session={session} />

          {/* Conversation timeline */}
          {session.conversation?.length > 0 && (
            <ConversationTimeline messages={session.conversation} />
          )}
        </div>

        {/* Right: side panel (desktop only — collapses to bottom on mobile) */}
        <div className="lg:col-span-1">
          {/* Desktop side panel */}
          <div className="hidden lg:block">
            <SessionSidePanel session={session} />
          </div>

          {/* Mobile: compact summary strip */}
          <div
            className="lg:hidden rounded-2xl p-4 flex flex-wrap gap-4"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
          >
            <MobileSummaryChip label="Equipment" value={session.equipment} />
            <MobileSummaryChip label="Technician" value={session.technician} />
            <MobileSummaryChip label="Confidence" value={`${session.confidence}%`} accent="#00e5ff" />
            <MobileSummaryChip
              label="Status"
              value={session.status}
              accent={session.status === 'Resolved' ? '#69f0ae' : '#ffab40'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileSummaryChip({ label, value, accent }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-[100px]">
      <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
      <span className="text-sm font-semibold" style={{ color: accent || 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  )
}
