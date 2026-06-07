import { HistoryCard } from './HistoryCard'
import { Spinner } from '../../../components/ui/Spinner'
import { History } from 'lucide-react'

export function HistoryList({ records, loading, onViewDetails }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Spinner size="lg" />
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Loading sessions…</p>
      </div>
    )
  }

  if (!records.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
        >
          <History size={24} style={{ color: 'var(--text-muted)' }} />
        </div>
        <div className="text-center">
          <p className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>No sessions found</p>
          <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {records.map((session, idx) => (
        <div
          key={session.id}
          style={{ animation: `fadeUp 0.35s ease-out ${idx * 40}ms both` }}
        >
          <HistoryCard session={session} onViewDetails={onViewDetails} />
        </div>
      ))}
    </div>
  )
}
