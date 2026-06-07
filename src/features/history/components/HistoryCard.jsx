import {
  Zap, Router, Wind, Cpu, Cable, Settings, Battery, Network, Wifi, Server,
  Calendar, User, ChevronRight, CheckCircle2, FolderOpen, AlertOctagon, AlertTriangle, Info, ShieldAlert,
} from 'lucide-react'

// ─── Helpers ──────────────────────────────────────────────────────────────
const ICON_MAP = {
  zap:     Zap,
  router:  Router,
  wind:    Wind,
  cpu:     Cpu,
  cable:   Cable,
  settings:Settings,
  battery: Battery,
  network: Network,
  wifi:    Wifi,
  server:  Server,
}

const SEV_CONFIG = {
  Critical: {
    icon: AlertOctagon,
    color: '#ff5252',
    bg: 'rgba(255,82,82,0.1)',
    border: 'rgba(255,82,82,0.3)',
    glow: 'rgba(255,82,82,0.08)',
  },
  High: {
    icon: AlertTriangle,
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
    border: 'rgba(251,146,60,0.3)',
    glow: 'rgba(251,146,60,0.06)',
  },
  Medium: {
    icon: ShieldAlert,
    color: '#ffab40',
    bg: 'rgba(255,171,64,0.1)',
    border: 'rgba(255,171,64,0.3)',
    glow: 'rgba(255,171,64,0.06)',
  },
  Low: {
    icon: Info,
    color: '#69f0ae',
    bg: 'rgba(105,240,174,0.1)',
    border: 'rgba(105,240,174,0.3)',
    glow: 'rgba(105,240,174,0.04)',
  },
}

const STATUS_CONFIG = {
  Open:     { color: '#ffab40', bg: 'rgba(255,171,64,0.1)',  border: 'rgba(255,171,64,0.3)',  icon: FolderOpen   },
  Resolved: { color: '#69f0ae', bg: 'rgba(105,240,174,0.1)', border: 'rgba(105,240,174,0.3)', icon: CheckCircle2 },
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  }) + ', ' + d.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

// ─── Component ────────────────────────────────────────────────────────────
export function HistoryCard({ session, onViewDetails }) {
  const sev    = SEV_CONFIG[session.severity]  || SEV_CONFIG.Low
  const status = STATUS_CONFIG[session.status] || STATUS_CONFIG.Open
  const SevIcon    = sev.icon
  const StatusIcon = status.icon
  const EquipIcon  = ICON_MAP[session.equipmentIcon] || Cpu

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-200 cursor-default group"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = sev.border
        e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.35), 0 0 0 1px ${sev.border}`
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-default)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Severity glow strip at top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${sev.color}, transparent)`, opacity: 0.7 }}
      />

      {/* Card body */}
      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Top row: equipment icon + severity + status */}
        <div className="flex items-start justify-between gap-2">
          {/* Equipment icon block */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: sev.glow, border: `1px solid ${sev.border}` }}
            >
              <EquipIcon size={18} style={{ color: sev.color }} />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-sm leading-tight truncate" style={{ color: 'var(--text-primary)' }}>
                {session.equipment}
              </p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {session.id}
              </p>
            </div>
          </div>

          {/* Severity badge */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg shrink-0"
            style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
          >
            <SevIcon size={11} style={{ color: sev.color }} />
            <span className="text-[11px] font-mono font-medium" style={{ color: sev.color }}>
              {session.severity}
            </span>
          </div>
        </div>

        {/* Issue */}
        <div>
          <p className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>DETECTED ISSUE</p>
          <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
            {session.issue}
          </p>
        </div>

        {/* Confidence bar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Confidence
            </span>
            <span
              className="text-xs font-mono font-semibold"
              style={{ color: session.confidence >= 90 ? '#69f0ae' : session.confidence >= 75 ? '#00e5ff' : '#ffab40' }}
            >
              {session.confidence}%
            </span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${session.confidence}%`,
                background: session.confidence >= 90
                  ? 'linear-gradient(90deg, #69f0ae, #00e5ff)'
                  : session.confidence >= 75
                    ? 'linear-gradient(90deg, #00e5ff, #2979ff)'
                    : '#ffab40',
              }}
            />
          </div>
        </div>

        {/* Meta row: date, technician */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={10} />
            {formatDate(session.timestamp)}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            <User size={10} />
            {session.technician}
          </span>
        </div>
      </div>

      {/* Footer: status + CTA */}
      <div
        className="px-5 py-3 flex items-center justify-between gap-3"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        {/* Status */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
          style={{ background: status.bg, border: `1px solid ${status.border}` }}
        >
          <StatusIcon size={11} style={{ color: status.color }} />
          <span className="text-[11px] font-mono font-medium" style={{ color: status.color }}>
            {session.status}
          </span>
        </div>

        {/* View Details */}
        <button
          onClick={() => onViewDetails(session.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 active:scale-95"
          style={{
            background: 'rgba(0,229,255,0.08)',
            border: '1px solid rgba(0,229,255,0.2)',
            color: 'var(--accent-cyan)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,229,255,0.15)'
            e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,229,255,0.08)'
            e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)'
          }}
        >
          View Details
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  )
}
