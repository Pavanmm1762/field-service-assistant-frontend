import { AlertTriangle, Cpu, Activity, CheckCircle2, XCircle, Info } from 'lucide-react'
import { ProgressBar } from '../../../components/ui/ProgressBar'
import { Badge } from '../../../components/ui/Badge'

const SEVERITY_CONFIG = {
  Critical: { variant: 'red', icon: XCircle, color: 'text-red-400', barColor: 'red' },
  High: { variant: 'red', icon: AlertTriangle, color: 'text-orange-400', barColor: 'red' },
  Medium: { variant: 'amber', icon: Info, color: 'text-amber-400', barColor: 'amber' },
  Low: { variant: 'green', icon: CheckCircle2, color: 'text-green-400', barColor: 'green' },
}

export function AnalysisResult({ result }) {
  if (!result) return null

  const sev = SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG.Medium
  const SevIcon = sev.icon
  const confidenceColor = result.confidence >= 90 ? 'cyan' : result.confidence >= 70 ? 'amber' : 'red'

  return (
    <div className="card p-4 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <Activity size={14} className="text-cyan-400" />
          </div>
          <span className="font-display font-semibold text-sm text-text-primary">Diagnostic Report</span>
        </div>
        <span className="text-[10px] font-mono text-text-muted">{new Date().toLocaleTimeString()}</span>
      </div>

      {/* Equipment */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <ResultCard
          label="Equipment"
          icon={<Cpu size={13} className="text-blue-400" />}
          value={result.equipment}
        />
        <ResultCard
          label="Severity"
          icon={<SevIcon size={13} className={sev.color} />}
          value={
            <Badge variant={sev.variant}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
              {result.severity}
            </Badge>
          }
        />
      </div>

      {/* Issue */}
      <div className="mb-4 p-3 rounded-xl bg-surface-700 border border-surface-600">
        <span className="label-sm block mb-1.5">Detected Issue</span>
        <p className="font-display font-semibold text-text-primary text-sm">{result.issue}</p>
      </div>

      {/* Confidence */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="label-sm">Detection Confidence</span>
          <span className={`text-sm font-mono font-medium ${
            result.confidence >= 90 ? 'text-cyan-400' :
            result.confidence >= 70 ? 'text-amber-400' : 'text-red-400'
          }`}>
            {result.confidence}%
          </span>
        </div>
        <ProgressBar value={result.confidence} max={100} color={confidenceColor} />
      </div>
    </div>
  )
}

function ResultCard({ label, icon, value }) {
  return (
    <div className="p-3 rounded-xl bg-surface-700 border border-surface-600">
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
        <span className="label-sm">{label}</span>
      </div>
      {typeof value === 'string' ? (
        <p className="font-display font-semibold text-text-primary text-sm">{value}</p>
      ) : (
        value
      )}
    </div>
  )
}
