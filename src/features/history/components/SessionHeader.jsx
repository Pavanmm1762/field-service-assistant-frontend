import {
  ArrowLeft, Zap, Router, Wind, Cpu, Cable, Settings,
  Battery, Network, Wifi, Server, AlertOctagon, AlertTriangle,
  ShieldAlert, Info, FolderOpen, CheckCircle2, Calendar, User, Hash,
} from 'lucide-react'

const ICON_MAP = {
  zap: Zap, router: Router, wind: Wind, cpu: Cpu, cable: Cable,
  settings: Settings, battery: Battery, network: Network, wifi: Wifi, server: Server,
}

const SEV_CONFIG = {
  Critical: { icon: AlertOctagon, color: '#ff5252', bg: 'rgba(255,82,82,0.1)', border: 'rgba(255,82,82,0.3)' },
  High:     { icon: AlertTriangle, color: '#fb923c', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.3)' },
  Medium:   { icon: ShieldAlert, color: '#ffab40', bg: 'rgba(255,171,64,0.1)', border: 'rgba(255,171,64,0.3)' },
  Low:      { icon: Info, color: '#69f0ae', bg: 'rgba(105,240,174,0.1)', border: 'rgba(105,240,174,0.3)' },
}

const STATUS_CONFIG = {
  Open:     { icon: FolderOpen, color: '#ffab40', bg: 'rgba(255,171,64,0.1)', border: 'rgba(255,171,64,0.3)' },
  Resolved: { icon: CheckCircle2, color: '#69f0ae', bg: 'rgba(105,240,174,0.1)', border: 'rgba(105,240,174,0.3)' },
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

export function SessionHeader({ session, onBack }) {
  const sev = SEV_CONFIG[session.severity] || SEV_CONFIG.Low
  const st  = STATUS_CONFIG[session.status] || STATUS_CONFIG.Open
  const SevIcon    = sev.icon
  const StatusIcon = st.icon
  const EquipIcon  = ICON_MAP[session.equipmentIcon] || Cpu

  return (
    <div
      className="relative rounded-2xl overflow-hidden p-5 sm:p-6"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
    >
      {/* Severity glow strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${sev.color} 40%, ${sev.color} 60%, transparent 100%)`, opacity: 0.8 }}
      />
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${sev.color}08 0%, transparent 70%)` }}
      />

      <div className="relative">
        {/* Back button + session ID */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-mono transition-all duration-150 active:scale-95"
            style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <ArrowLeft size={14} />
            Back to History
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            <Hash size={11} />
            {session.id}
          </div>
        </div>

        {/* Main header content */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Equipment icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
          >
            <EquipIcon size={26} style={{ color: sev.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="font-display font-bold text-xl sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
                {session.equipment}
              </h1>
              {/* Severity badge */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
              >
                <SevIcon size={12} style={{ color: sev.color }} />
                <span className="text-xs font-mono font-semibold" style={{ color: sev.color }}>
                  {session.severity}
                </span>
              </div>
              {/* Status badge */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <StatusIcon size={12} style={{ color: st.color }} />
                <span className="text-xs font-mono font-semibold" style={{ color: st.color }}>
                  {session.status}
                </span>
              </div>
            </div>

            <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
              {session.issue}
            </p>

            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                <Calendar size={12} />
                {formatDate(session.timestamp)}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                <User size={12} />
                {session.technician}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
