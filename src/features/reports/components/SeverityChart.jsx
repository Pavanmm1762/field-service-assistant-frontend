import { useState } from 'react'
import { Spinner } from '../../../components/ui/Spinner'

function buildArcs(data) {
  const total = data.reduce((s, d) => s + d.value, 0)
  let cumAngle = -Math.PI / 2
  return data.map((d) => {
    const angle = (d.value / total) * 2 * Math.PI
    const startAngle = cumAngle
    cumAngle += angle
    return { ...d, startAngle, endAngle: cumAngle, pct: ((d.value / total) * 100).toFixed(1) }
  })
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy + r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy + r * Math.sin(endAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

export function SeverityChart({ data, loading }) {
  const [hovered, setHovered] = useState(null)

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <Spinner size="lg" />
    </div>
  )

  const total = data.reduce((s, d) => s + d.value, 0)
  const arcs = buildArcs(data)
  const cx = 80, cy = 80, r = 58, thickness = 18
  const innerR = r - thickness

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Donut */}
      <svg width="160" height="160" className="shrink-0">
        {arcs.map((arc, i) => {
          const isHov = hovered === i
          const midAngle = (arc.startAngle + arc.endAngle) / 2
          const offset = isHov ? 4 : 0
          const ox = offset * Math.cos(midAngle)
          const oy = offset * Math.sin(midAngle)
          return (
            <g key={arc.label} transform={`translate(${ox},${oy})`} style={{ cursor: 'pointer' }}
               onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <path
                d={arcPath(cx, cy, r, arc.startAngle, arc.endAngle)}
                fill="none"
                stroke={arc.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                opacity={hovered !== null && !isHov ? 0.4 : 1}
                style={{ transition: 'opacity 0.15s' }}
              />
            </g>
          )
        })}
        {/* Centre label */}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="700"
              fill="var(--text-primary)" fontFamily="Syne, sans-serif">
          {hovered !== null ? arcs[hovered]?.value : total}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="var(--text-muted)"
              fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">
          {hovered !== null ? arcs[hovered]?.label.toUpperCase() : 'TOTAL'}
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-3 flex-1 w-full">
        {arcs.map((arc, i) => (
          <div key={arc.label}
               className="flex items-center gap-3 cursor-pointer"
               onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
               style={{ opacity: hovered !== null && hovered !== i ? 0.45 : 1, transition: 'opacity 0.15s' }}>
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: arc.color }} />
            <span className="text-xs font-mono flex-1" style={{ color: 'var(--text-secondary)' }}>{arc.label}</span>
            <span className="text-xs font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{arc.value}</span>
            <span className="text-[10px] font-mono w-10 text-right" style={{ color: 'var(--text-muted)' }}>{arc.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
