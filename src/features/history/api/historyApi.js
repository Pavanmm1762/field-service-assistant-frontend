// ─── Equipment catalogue ───────────────────────────────────────────────────

import axiosInstance from '../../../lib/axios'

const EQUIPMENT_CATALOGUE = [
  { name: 'Electrical Wall Socket',  icon: 'zap'         },
  { name: 'Router',                  icon: 'router'      },
  { name: 'HVAC Unit',               icon: 'wind'        },
  { name: 'Power Distribution Board',icon: 'cpu'         },
  { name: 'Fiber Optic Splice Box',  icon: 'cable'       },
  { name: 'Industrial Motor',        icon: 'settings'    },
  { name: 'UPS Battery Pack',        icon: 'battery'     },
  { name: 'Network Switch',          icon: 'network'     },
  { name: 'Access Point',            icon: 'wifi'        },
  { name: 'Patch Panel',             icon: 'server'      },
]

const ISSUE_MAP = {
  'Electrical Wall Socket':   ['Exposed live electrical components', 'Burnt socket casing', 'Loose terminal connection', 'Melted insulation detected'],
  'Router':                   ['Damaged Ethernet port', 'Firmware corruption', 'Overheating warning', 'Port congestion'],
  'HVAC Unit':                ['Compressor vibration anomaly', 'Refrigerant leak detected', 'Fan blade obstruction', 'Filter blockage critical'],
  'Power Distribution Board': ['Arc flash residue detected', 'Breaker overload condition', 'Busbar corrosion', 'Ground fault detected'],
  'Fiber Optic Splice Box':   ['Splice tray misalignment', 'Water ingress detected', 'Connector contamination', 'Cable bend radius violation'],
  'Industrial Motor':         ['Bearing wear detected', 'Winding insulation failure', 'Shaft misalignment', 'Thermal overload tripped'],
  'UPS Battery Pack':         ['Cell sulfation detected', 'Battery swelling observed', 'Charge cycle failure', 'Electrolyte leak'],
  'Network Switch':           ['Port PHY damage', 'SFP module failure', 'Backplane temperature critical', 'PoE circuit fault'],
  'Access Point':             ['Antenna connector loose', 'Radio module overheating', 'Mounting bracket failure', 'Water condensation'],
  'Patch Panel':              ['Port label misrouting', 'Connector oxidation', 'Cable strain relief failure', 'Dust accumulation critical'],
}

const ROOT_CAUSES = {
  'Exposed live electrical components':  'Aged socket faceplate cracked due to thermal cycling, exposing terminals.',
  'Damaged Ethernet port':               'Physical impact to RJ45 connector bent the retaining clip and pins.',
  'Compressor vibration anomaly':        'Worn anti-vibration mounts allowing resonance at operating frequency.',
  'Arc flash residue detected':          'Intermittent overcurrent event caused insulation carbonisation.',
  'Splice tray misalignment':            'Incorrect reinsertion after last maintenance cycle.',
  'Bearing wear detected':               'Lubrication interval exceeded by 240 operational hours.',
  'Cell sulfation detected':             'Battery discharged below 10.5 V threshold on three occasions.',
  'Port PHY damage':                     'ESD event during hot-swap operation without grounding strap.',
  'Antenna connector loose':             'Vibration from adjacent HVAC unit loosened N-type connector.',
  'Port label misrouting':               'Patch cable swapped during emergency network reconfiguration.',
}

const RECOMMENDED_ACTIONS = {
  'Exposed live electrical components':  'Isolate circuit at MCB. Replace socket faceplate assembly (Part #SKT-DPL-20A). Re-energise and test with insulation tester before sign-off.',
  'Damaged Ethernet port':               'Disconnect power. Inspect RJ45 socket under magnification. Replace port module (Part #RJ45-CAT6-PORT). Reboot and verify link negotiation.',
  'Compressor vibration anomaly':        'Shutdown unit. Replace anti-vibration mounts set (Part #AVM-14B). Re-align compressor to base plate. Run 30-minute vibration test.',
  'Arc flash residue detected':          'De-energise board. Clean arc residue with dry cloth. Replace damaged busbar section. Thermographic survey before re-energisation.',
  'Splice tray misalignment':            'Open splice box. Re-seat tray guides. Verify fibre bend radius ≥ 30 mm. Re-seal enclosure with IP67 gasket.',
  'Bearing wear detected':               'Remove motor end cover. Replace bearing pair (SKF 6205-2RS). Re-grease, reassemble, run 15-minute load test.',
  'Cell sulfation detected':             'Run desulfation cycle via UPS maintenance mode. If capacity < 80%, replace battery module (Part #BAT-12V-40AH).',
  'Port PHY damage':                     'Replace SFP/RJ45 port module. Apply ESD protocols for all future hot-swap operations.',
  'Antenna connector loose':             'Torque N-type connector to 1.0 Nm. Apply thread-lock compound. Re-survey RF coverage.',
  'Port label misrouting':               'Trace all affected cables using cable toner. Update patch panel schedule in network documentation.',
}

const SAFETY_WARNINGS = {
  'Exposed live electrical components':  'DANGER — Do NOT touch terminals without full PPE. Ensure LOTO procedure applied before any physical intervention.',
  'Arc flash residue detected':          'HIGH VOLTAGE — Maintain 1.2 m exclusion zone. Category 2 arc flash PPE mandatory.',
  'Bearing wear detected':               'Lockout/Tagout motor before removal. Do not run motor with end cover removed.',
  'Cell sulfation detected':             'Risk of hydrogen gas emission. Ensure adequate ventilation. No open flames within 3 m.',
}

const TECHNICIANS = ['Arjun M.', 'Priya K.', 'Ravi S.', 'Deepa N.', 'Kiran P.', 'Sunita R.']
const STATUSES    = ['Open', 'Resolved', 'Open', 'Resolved', 'Resolved', 'Open']  // weighted toward Open/Resolved

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

// ─── Severity weighting ───────────────────────────────────────────────────
function randomSeverity() {
  const r = Math.random()
  if (r < 0.15) return 'Critical'
  if (r < 0.35) return 'High'
  if (r < 0.70) return 'Medium'
  return 'Low'
}

// ─── Conversation mock ────────────────────────────────────────────────────
function generateConversation(issue, equipment, rootCause, action) {
  return [
    {
      role: 'user',
      content: `I've uploaded an image of the ${equipment}. It looks like there's a problem.`,
    },
    {
      role: 'assistant',
      content: `I've analysed the image. The diagnostic has detected: **${issue}**. ${rootCause || 'Further inspection is required to determine the root cause.'}`,
    },
    {
      role: 'user',
      content: 'What should I do to fix this?',
    },
    {
      role: 'assistant',
      content: action || 'Please follow standard maintenance procedures and consult the equipment manual.',
    },
    {
      role: 'user',
      content: 'Are there any safety precautions I should be aware of?',
    },
    {
      role: 'assistant',
      content: SAFETY_WARNINGS[issue] || 'Follow standard PPE protocols. Ensure the equipment is de-energised before physical inspection. Consult your site safety officer if unsure.',
    },
  ]
}

// ─── Session generator ────────────────────────────────────────────────────
function generateSession(id) {
  const equip   = rand(EQUIPMENT_CATALOGUE)
  const issues  = ISSUE_MAP[equip.name] || ['Unknown fault']
  const issue   = rand(issues)
  const severity = randomSeverity()
  const confidence = randInt(78, 99)
  const date = new Date(Date.now() - randInt(0, 30) * 86400000 - randInt(0, 23) * 3600000)
  const rootCause = ROOT_CAUSES[issue]   || 'Root cause analysis inconclusive — further on-site inspection required.'
  const action    = RECOMMENDED_ACTIONS[issue] || 'Consult equipment manual and escalate to Level 2 support.'
  const status    = rand(STATUSES)
  const conv      = generateConversation(issue, equip.name, rootCause, action)
  // stagger conversation timestamps
  const convWithTime = conv.map((m, i) => ({
    ...m,
    id: `msg-${id}-${i}`,
    timestamp: new Date(date.getTime() + i * 90000).toISOString(),
  }))

  return {
    id: `FSA-${String(id).padStart(4, '0')}`,
    equipment:         equip.name,
    equipmentIcon:     equip.icon,
    issue,
    severity,
    confidence,
    status,
    technician:        rand(TECHNICIANS),
    timestamp:         date.toISOString(),
    rootCause,
    recommendedAction: action,
    safetyWarning:     SAFETY_WARNINGS[issue] || null,
    conversation:      convWithTime,
    imageUrl:          null,   // real app: presigned URL
  }
}

// ─── Stable in-memory store ───────────────────────────────────────────────
const ALL_SESSIONS = Array.from({ length: 64 }, (_, i) => generateSession(i + 1))
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

// ─── Stats ────────────────────────────────────────────────────────────────
export function getStats() {
  return {
    total:    ALL_SESSIONS.length,
    critical: ALL_SESSIONS.filter(s => s.severity === 'Critical').length,
    open:     ALL_SESSIONS.filter(s => s.status   === 'Open').length,
    resolved: ALL_SESSIONS.filter(s => s.status   === 'Resolved').length,
  }
}

// // ─── List (paginated + filtered) ─────────────────────────────────────────
// export async function fetchHistory({ page = 1, pageSize = 9, severity = '', status = '', search = '' } = {}) {
//   await new Promise(r => setTimeout(r, 280))
//   let filtered = [...ALL_SESSIONS]
//   if (severity) filtered = filtered.filter(s => s.severity === severity)
//   if (status)   filtered = filtered.filter(s => s.status   === status)
//   if (search) {
//     const q = search.toLowerCase()
//     filtered = filtered.filter(s =>
//       s.id.toLowerCase().includes(q) ||
//       s.equipment.toLowerCase().includes(q) ||
//       s.issue.toLowerCase().includes(q) ||
//       s.technician.toLowerCase().includes(q)
//     )
//   }
//   const total      = filtered.length
//   const totalPages = Math.ceil(total / pageSize) || 1
//   const data       = filtered.slice((page - 1) * pageSize, page * pageSize)
//   return { data, total, totalPages, page, pageSize }
// }

// // ─── Single session ───────────────────────────────────────────────────────
// export async function fetchSession(id) {
//   await new Promise(r => setTimeout(r, 180))
//   const session = ALL_SESSIONS.find(s => s.id === id)
//   if (!session) throw new Error(`Session ${id} not found`)
//   return session
// }


export async function fetchHistory({
  page = 1,
  pageSize = 9,
} = {}) {

  const response = await axiosInstance.get(
    '/history'
  )

  const sessions = response.data

  console.log(
    'Fetched sessions:',
    sessions
  )

  return {
    data: sessions,
    total: sessions.length,
    totalPages: Math.ceil(
      sessions.length / pageSize
    ) || 1,
    page,
    pageSize
  }
}

export async function fetchSession(id) {
  const response = await axiosInstance.get(
    `/history/${id}`
  )
  return response.data
}