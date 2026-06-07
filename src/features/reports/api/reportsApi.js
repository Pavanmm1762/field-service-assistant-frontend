function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

// KPI summary
export async function fetchReportSummary() {
  await new Promise((r) => setTimeout(r, 280))
  return {
    totalJobs: 847,
    resolvedToday: 23,
    avgResolutionMin: 18,
    criticalOpen: 4,
    aiAccuracy: 97.4,
    fieldTechnicians: 12,
  }
}

// Severity distribution
export async function fetchSeverityDistribution() {
  await new Promise((r) => setTimeout(r, 300))
  return [
    { label: 'Critical', value: 54, color: '#ff5252' },
    { label: 'High',     value: 128, color: '#fb923c' },
    { label: 'Medium',   value: 391, color: '#ffab40' },
    { label: 'Low',      value: 274, color: '#69f0ae' },
  ]
}

// Jobs over last 14 days
export async function fetchJobTrend() {
  await new Promise((r) => setTimeout(r, 310))
  const today = new Date()
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (13 - i))
    return {
      date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      resolved: randInt(8, 32),
      escalated: randInt(0, 6),
    }
  })
}

// Top equipment by fault count
export async function fetchEquipmentBreakdown() {
  await new Promise((r) => setTimeout(r, 290))
  return [
    { name: 'Router',         faults: 187, resolved: 162 },
    { name: 'Switch',         faults: 143, resolved: 128 },
    { name: 'Access Point',   faults: 119, resolved: 101 },
    { name: 'ONT Device',     faults: 98,  resolved: 79  },
    { name: 'Power Supply',   faults: 84,  resolved: 72  },
    { name: 'Fiber Splitter', faults: 67,  resolved: 60  },
    { name: 'Cable Modem',    faults: 55,  resolved: 52  },
    { name: 'Patch Panel',    faults: 34,  resolved: 30  },
  ]
}

// Top technicians — paginated
export async function fetchTechnicianLeaderboard({ page = 1, pageSize = 5 } = {}) {
  await new Promise((r) => setTimeout(r, 260))
  const all = [
    { name: 'Arjun M.',  jobs: 142, resolved: 138, avgMin: 14, score: 98 },
    { name: 'Priya K.',  jobs: 127, resolved: 121, avgMin: 17, score: 95 },
    { name: 'Ravi S.',   jobs: 118, resolved: 110, avgMin: 21, score: 93 },
    { name: 'Deepa N.',  jobs: 109, resolved: 99,  avgMin: 19, score: 91 },
    { name: 'Kiran P.',  jobs: 97,  resolved: 88,  avgMin: 23, score: 89 },
    { name: 'Sunita R.', jobs: 89,  resolved: 79,  avgMin: 26, score: 87 },
    { name: 'Mohan V.',  jobs: 74,  resolved: 65,  avgMin: 29, score: 84 },
    { name: 'Rekha D.',  jobs: 62,  resolved: 54,  avgMin: 31, score: 82 },
    { name: 'Suresh T.', jobs: 53,  resolved: 44,  avgMin: 35, score: 79 },
    { name: 'Kavya L.',  jobs: 41,  resolved: 34,  avgMin: 38, score: 76 },
    { name: 'Vijay R.',  jobs: 33,  resolved: 26,  avgMin: 42, score: 73 },
    { name: 'Nisha B.',  jobs: 21,  resolved: 16,  avgMin: 47, score: 68 },
  ]
  const total = all.length
  const totalPages = Math.ceil(total / pageSize)
  const data = all.slice((page - 1) * pageSize, page * pageSize)
  return { data, total, totalPages, page, pageSize }
}
