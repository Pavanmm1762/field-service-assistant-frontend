export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-surface-700 text-text-secondary border border-surface-500',
    cyan: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
    green: 'bg-green-500/10 text-green-400 border border-green-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    red: 'bg-red-500/10 text-red-400 border border-red-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
