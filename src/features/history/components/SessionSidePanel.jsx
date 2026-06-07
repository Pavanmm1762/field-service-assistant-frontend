import {
  Cpu, Gauge, FolderOpen, CheckCircle2, Calendar,
  User, AlertOctagon, AlertTriangle, ShieldAlert, Info, MapPin,
} from 'lucide-react'

const SEV_CONFIG = {
  Critical: { icon: AlertOctagon, color: '#ff5252', bg: 'rgba(255,82,82,0.08)', border: 'rgba(255,82,82,0.2)' },
  High:     { icon: AlertTriangle, color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)' },
  Medium:   { icon: ShieldAlert, color: '#ffab40', bg: 'rgba(255,171,64,0.08)', border: 'rgba(255,171,64,0.2)' },
  Low:      { icon: Info, color: '#69f0ae', bg: 'rgba(105,240,174,0.08)', border: 'rgba(105,240,174,0.2)' },
}

const STATUS_CONFIG = {
  Open:     { icon: FolderOpen, color: '#ffab40', bg: 'rgba(255,171,64,0.08)', border: 'rgba(255,171,64,0.2)' },
  Resolved: { icon: CheckCircle2, color: '#69f0ae', bg: 'rgba(105,240,174,0.08)', border: 'rgba(105,240,174,0.2)' },
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
function formatTime(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function SidePanelRow({ icon: Icon, accent, label, value, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
        <Icon size={10} style={{ color: accent }} />
        {label}
      </span>
      {children ?? (
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</span>
      )}
    </div>
  )
}

export function SessionSidePanel({ session }) {
  const sev = SEV_CONFIG[session.severity] || SEV_CONFIG.Low
  const st  = STATUS_CONFIG[session.status] || STATUS_CONFIG.Open
  const SevIcon    = sev.icon
  const StatusIcon = st.icon
  const confColor  = session.confidence >= 90 ? '#69f0ae' : session.confidence >= 75 ? '#00e5ff' : '#ffab40'

  return (
    <div
      className="rounded-2xl overflow-hidden sticky top-20"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
    >
      {/* Panel title */}
      <div
        className="px-5 py-4 font-display font-semibold text-sm"
        style={{
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-default)',
          background: 'var(--bg-elevated)',
        }}
      >
        Session Summary
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Severity */}
        <SidePanelRow icon={SevIcon} accent={sev.color} label="Severity">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl w-full"
            style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
          >
            <SevIcon size={14} style={{ color: sev.color }} />
            <span className="text-sm font-mono font-semibold" style={{ color: sev.color }}>
              {session.severity}
            </span>
          </div>
        </SidePanelRow>

        <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

        {/* Status */}
        <SidePanelRow icon={StatusIcon} accent={st.color} label="Resolution Status">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl w-full"
            style={{ background: st.bg, border: `1px solid ${st.border}` }}
          >
            <StatusIcon size={14} style={{ color: st.color }} />
            <span className="text-sm font-mono font-semibold" style={{ color: st.color }}>
              {session.status}
            </span>
          </div>
        </SidePanelRow>

        <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

        {/* Equipment */}
        <SidePanelRow icon={Cpu} accent="#2979ff" label="Equipment Type" value={session.equipment} />

        <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

        {/* Confidence */}
        <SidePanelRow icon={Gauge} accent={confColor} label="Confidence Score">
          <div className="flex flex-col gap-1.5">
            <span className="font-display font-bold text-xl" style={{ color: confColor }}>
              {session.confidence}%
            </span>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
              <div
                className="h-full rounded-full"
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
        </SidePanelRow>

        <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

        {/* Technician */}
        <SidePanelRow icon={User} accent="#8a9ab5" label="Technician" value={session.technician} />

        <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

        {/* Analysis date */}
        <SidePanelRow icon={Calendar} accent="#8a9ab5" label="Analysis Date">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatDate(session.timestamp)}</span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{formatTime(session.timestamp)}</span>
          </div>
        </SidePanelRow>

        <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

        {/* Session ID */}
        <SidePanelRow icon={MapPin} accent="#8a9ab5" label="Session ID">
          <span className="text-sm font-mono" style={{ color: 'var(--accent-cyan)' }}>{session.id}</span>
        </SidePanelRow>
      </div>
    </div>
  )
}
