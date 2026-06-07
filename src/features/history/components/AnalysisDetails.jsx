import {
  Cpu, AlertOctagon, Gauge, Brain,
  Wrench, ShieldAlert, AlertTriangle, Activity,
} from 'lucide-react'

const SEV_CONFIG = {
  Critical: { color: '#ff5252', bg: 'rgba(255,82,82,0.08)', border: 'rgba(255,82,82,0.25)' },
  High:     { color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)' },
  Medium:   { color: '#ffab40', bg: 'rgba(255,171,64,0.08)', border: 'rgba(255,171,64,0.25)' },
  Low:      { color: '#69f0ae', bg: 'rgba(105,240,174,0.08)', border: 'rgba(105,240,174,0.25)' },
}

function DetailRow({ icon: Icon, accent, label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
        >
          <Icon size={13} style={{ color: accent }} />
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      </div>
      <div className="pl-8">
        {children}
      </div>
    </div>
  )
}

export function AnalysisDetails({ session }) {
  const sev = SEV_CONFIG[session.severity] || SEV_CONFIG.Low
  const confColor = session.confidence >= 90 ? '#69f0ae' : session.confidence >= 75 ? '#00e5ff' : '#ffab40'

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 flex flex-col gap-6"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
    >
      {/* Section title */}
      <div className="flex items-center gap-2 pb-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}
        >
          <Activity size={14} style={{ color: '#00e5ff' }} />
        </div>
        <h2 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Analysis Details
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Equipment */}
        <DetailRow icon={Cpu} accent="#2979ff" label="Equipment">
          <p className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {session.equipment}
          </p>
        </DetailRow>

        {/* Issue */}
        <DetailRow icon={AlertOctagon} accent={sev.color} label="Detected Issue">
          <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            {session.issue}
          </p>
        </DetailRow>

        {/* Severity */}
        <DetailRow icon={AlertTriangle} accent={sev.color} label="Severity">
          <span
            className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-mono font-semibold"
            style={{ background: sev.bg, border: `1px solid ${sev.border}`, color: sev.color }}
          >
            {session.severity}
          </span>
        </DetailRow>

        {/* Confidence */}
        <DetailRow icon={Gauge} accent={confColor} label="Confidence Score">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-2xl leading-none" style={{ color: confColor }}>
              {session.confidence}%
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${session.confidence}%`,
                  background: session.confidence >= 90
                    ? 'linear-gradient(90deg, #69f0ae, #00e5ff)'
                    : session.confidence >= 75
                      ? 'linear-gradient(90deg, #00e5ff, #2979ff)'
                      : '#ffab40',
                  transition: 'width 0.8s ease-out',
                }}
              />
            </div>
          </div>
        </DetailRow>
      </div>

      {/* Root cause */}
      {session.rootCause && (
        <div className="pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <DetailRow icon={Brain} accent="#a78bfa" label="Root Cause Analysis">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {session.rootCause}
            </p>
          </DetailRow>
        </div>
      )}

      {/* Recommended action */}
      {session.recommendedAction && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(41,121,255,0.05)', border: '1px solid rgba(41,121,255,0.15)' }}
        >
          <DetailRow icon={Wrench} accent="#2979ff" label="Recommended Action">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {session.recommendedAction}
            </p>
          </DetailRow>
        </div>
      )}

      {/* Safety warning */}
      {session.safetyWarning && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.2)' }}
        >
          <DetailRow icon={ShieldAlert} accent="#ff5252" label="Safety Warning">
            <p className="text-sm leading-relaxed font-medium" style={{ color: '#ff8a80' }}>
              {session.safetyWarning}
            </p>
          </DetailRow>
        </div>
      )}
    </div>
  )
}
