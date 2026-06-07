import { useState } from 'react'
import { Spinner } from '../../../components/ui/Spinner'

export function JobTrendChart({ data, loading }) {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <Spinner size="lg" />
    </div>
  )

  const W = 520, H = 160
  const padL = 32, padR = 12, padT = 12, padB = 28
  const chartW = W - padL - padR
  const chartH = H - padT - padB
  const n = data.length
  const barW = (chartW / n) * 0.55
  const step = chartW / n

  const maxVal = Math.max(...data.map((d) => d.resolved + d.escalated), 1)

  const xOf  = (i) => padL + i * step + step / 2
  const yOf  = (v) => padT + chartH - (v / maxVal) * chartH
  const escY = (d) => yOf(d.resolved + d.escalated)

  const linePts = data.map((d, i) => `${xOf(i)},${escY(d)}`).join(' ')

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 300 }}>
        {/* Y grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padT + chartH * (1 - t)
          return (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y} y2={y}
                    stroke="var(--border-subtle)" strokeWidth="1" />
              <text x={padL - 4} y={y + 3.5} textAnchor="end" fontSize="8"
                    fill="var(--text-muted)" fontFamily="JetBrains Mono, monospace">
                {Math.round(maxVal * t)}
              </text>
            </g>
          )
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const bx = xOf(i) - barW / 2
          const resH = (d.resolved / maxVal) * chartH
          const escH = (d.escalated / maxVal) * chartH
          const isHov = hoveredIdx === i
          return (
            <g key={i} style={{ cursor: 'pointer' }}
               onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
              {/* resolved bar */}
              <rect x={bx} y={yOf(d.resolved)} width={barW} height={resH}
                    fill="var(--accent-cyan)" opacity={isHov ? 0.9 : 0.45} rx="2" />
              {/* escalated stacked */}
              {d.escalated > 0 && (
                <rect x={bx} y={escY(d)} width={barW} height={escH}
                      fill="#ff5252" opacity={isHov ? 0.9 : 0.5} rx="2" />
              )}
              {/* x label */}
              <text x={xOf(i)} y={H - 4} textAnchor="middle" fontSize="8"
                    fill={isHov ? 'var(--text-secondary)' : 'var(--text-muted)'}
                    fontFamily="JetBrains Mono, monospace">
                {d.date}
              </text>
              {/* tooltip */}
              {isHov && (
                <g>
                  <rect x={xOf(i) - 30} y={escY(d) - 28} width={60} height={22} rx="4"
                        fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
                  <text x={xOf(i)} y={escY(d) - 13} textAnchor="middle" fontSize="9"
                        fill="var(--text-primary)" fontFamily="JetBrains Mono, monospace">
                    {d.resolved}✓ {d.escalated}↑
                  </text>
                </g>
              )}
            </g>
          )
        })}

        {/* Escalation trend line */}
        <polyline points={linePts} fill="none" stroke="#ff5252" strokeWidth="1.5"
                  strokeDasharray="3 2" opacity="0.6" />

        {data.map((d, i) => (
          <circle key={i} cx={xOf(i)} cy={escY(d)} r="2.5"
                  fill="#ff5252" opacity="0.7" />
        ))}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 pl-8">
        <LegendItem color="var(--accent-cyan)" opacity="0.7" label="Resolved" />
        <LegendItem color="#ff5252"            opacity="0.7" label="Escalated (line)" dashed />
      </div>
    </div>
  )
}

function LegendItem({ color, label, opacity = 1, dashed }) {
  return (
    <div className="flex items-center gap-1.5">
      {dashed ? (
        <svg width="16" height="10">
          <line x1="0" y1="5" x2="16" y2="5" stroke={color} strokeWidth="1.5"
                strokeDasharray="3 2" opacity={opacity} />
        </svg>
      ) : (
        <span className="w-3 h-3 rounded-sm" style={{ background: color, opacity }} />
      )}
      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}
