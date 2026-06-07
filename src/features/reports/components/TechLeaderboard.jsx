import { Trophy, TrendingUp } from 'lucide-react'
import { Pagination } from '../../../components/ui/Pagination'
import { Spinner } from '../../../components/ui/Spinner'

const MEDALS = ['🥇', '🥈', '🥉']

function ScoreBar({ score }) {
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${score}%`,
            background: score >= 95 ? '#69f0ae' : score >= 85 ? 'var(--accent-cyan)' : '#ffab40',
          }}
        />
      </div>
      <span className="text-[11px] font-mono font-medium w-8 text-right"
            style={{ color: score >= 95 ? '#69f0ae' : score >= 85 ? 'var(--accent-cyan)' : '#ffab40' }}>
        {score}
      </span>
    </div>
  )
}

export function TechLeaderboard({ data, page, setPage, totalPages, total, loading, pageSize }) {
  const globalOffset = (page - 1) * pageSize

  return (
    <div className="flex flex-col gap-0">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                {['Rank', 'Technician', 'Jobs', 'Resolved', 'Avg. Time', 'Score'].map((h) => (
                  <th key={h}
                      className="px-4 py-3 text-left text-[10px] font-mono font-medium tracking-widest uppercase"
                      style={{ color: 'var(--text-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((tech, i) => {
                const rank = globalOffset + i + 1
                return (
                  <tr key={tech.name}
                      className="transition-colors"
                      style={{ borderBottom: '1px solid var(--border-subtle)', animationDelay: `${i * 40}ms`, animation: 'fadeUp 0.3s ease-out forwards', opacity: 0 }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                      {rank <= 3 && page === 1 ? (
                        <span>{MEDALS[rank - 1]}</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>#{rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {tech.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {tech.jobs}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: '#69f0ae' }}>{tech.resolved}</span>
                      <span style={{ color: 'var(--text-muted)' }}>/{tech.jobs}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {tech.avgMin}m
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBar score={tech.score} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border-default)' }}>
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={total}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  )
}
