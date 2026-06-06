import { useEffect, useState } from 'react'

export function ProgressBar({ value = 0, max = 100, className = '', color = 'cyan' }) {
  const [width, setWidth] = useState(0)
  const percentage = Math.round((value / max) * 100)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 100)
    return () => clearTimeout(timer)
  }, [percentage])

  const colors = {
    cyan: 'bg-cyan-400',
    green: 'bg-green-400',
    amber: 'bg-amber-400',
    red: 'bg-red-400',
  }

  return (
    <div className={`w-full h-1.5 bg-surface-700 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${colors[color]}`}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
