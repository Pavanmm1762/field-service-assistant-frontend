export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-[1.5px]',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-2',
  }

  return (
    <span
      className={`inline-block rounded-full border-surface-500 border-t-accent-cyan animate-spin ${sizes[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}
