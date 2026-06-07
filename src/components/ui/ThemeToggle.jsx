import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../store/AppContext'

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative w-8 h-8 rounded-lg flex items-center justify-center
        transition-all duration-200 group
        ${className}
      `}
      style={{
        border: '1px solid var(--border-default)',
        background: 'var(--bg-elevated)',
        color: 'var(--text-muted)',
      }}
    >
      <span
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'var(--bg-hover)' }}
      />
      <span className="relative transition-transform duration-300" style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)' }}>
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  )
}
