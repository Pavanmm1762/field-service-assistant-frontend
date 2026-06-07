import { Spinner } from '../../../components/ui/Spinner'

export function EquipmentBreakdown({ data, loading }) {
  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <Spinner size="lg" />
    </div>
  )

  const maxFaults = Math.max(...data.map((d) => d.faults), 1)

  return (
    <div className="flex flex-col gap-3">
      {data.map((row, i) => {
        const resolvePct = Math.round((row.resolved / row.faults) * 100)
        const barWidth   = (row.faults / maxFaults) * 100

        return (
          <div key={row.name}
               className="flex flex-col gap-1"
               style={{ animationDelay: `${i * 40}ms`, animation: 'fadeUp 0.35s ease-out forwards', opacity: 0 }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{row.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                  {row.resolved}/{row.faults}
                </span>
                <span
                  className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded"
                  style={{
                    background: resolvePct >= 90 ? 'rgba(105,240,174,0.1)' : resolvePct >= 75 ? 'rgba(255,171,64,0.1)' : 'rgba(255,82,82,0.1)',
                    color:      resolvePct >= 90 ? '#69f0ae'                : resolvePct >= 75 ? '#ffab40'               : '#ff5252',
                  }}
                >
                  {resolvePct}%
                </span>
              </div>
            </div>
            {/* Track */}
            <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
              {/* Faults bar */}
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                style={{ width: `${barWidth}%`, background: 'var(--border-strong)', transitionDelay: `${i * 40}ms` }}
              />
              {/* Resolved bar */}
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(row.resolved / maxFaults) * 100}%`,
                  background: resolvePct >= 90 ? '#69f0ae' : resolvePct >= 75 ? '#ffab40' : '#ff5252',
                  transitionDelay: `${i * 40 + 150}ms`,
                  opacity: 0.85,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
