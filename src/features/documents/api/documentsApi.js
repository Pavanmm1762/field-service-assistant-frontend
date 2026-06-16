import axiosInstance from '../../../lib/axios'

// ─── Mock data (used when backend is unreachable) ─────────────────────────
const EQUIPMENT_NAMES = [
  'Router', 'Switch', 'Access Point', 'ONT Device', 'Fiber Splitter',
  'Power Supply', 'Cable Modem', 'Patch Panel', 'Network Bridge', 'VoIP Gateway',
]
const DOC_STATUSES = ['indexed', 'indexed', 'indexed', 'pending', 'failed']

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function pad(n) { return String(n).padStart(4, '0') }

const MOCK_DOCS = Array.from({ length: 63 }, (_, i) => {
  const eq = rand(EQUIPMENT_NAMES)
  const status = rand(DOC_STATUSES)
  const created = new Date(Date.now() - randInt(0, 60) * 86400000)
  const updated = new Date(created.getTime() + randInt(0, 5) * 3600000)
  return {
    id: `doc-${pad(i + 1)}`,
    filename: `${eq.toLowerCase().replace(/\s+/g, '_')}_manual_v${randInt(1, 4)}.${rand(['pdf', 'docx', 'md'])}`,
    equipment: eq,
    chunk_count: status === 'indexed' ? randInt(12, 148) : 0,
    status,
    file_path: `/knowledge-base/${eq.toLowerCase().replace(/\s+/g, '-')}/${rand(['manual', 'guide', 'spec', 'troubleshoot'])}.pdf`,
    checksum: Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') +
              '...' +
              Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    created_at: created.toISOString(),
    updated_at: updated.toISOString(),
  }
}).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

// ─── API functions ────────────────────────────────────────────────────────

export async function fetchDocuments({ page = 1, pageSize = 10, search = '', equipment = '', status = '' } = {}) {
  try {
    const params = new URLSearchParams()
    params.set('page', page)
    params.set('page_size', pageSize)
    if (search)    params.set('search', search)
    if (equipment) params.set('equipment', equipment)
    if (status)    params.set('status', status)

    const res = await axiosInstance.get(`/knowledge/documents?${params}`)
    return res.data
  } catch {
    // Mock fallback
    await new Promise(r => setTimeout(r, 380))
    let filtered = [...MOCK_DOCS]
    if (search)    filtered = filtered.filter(d => d.filename.toLowerCase().includes(search.toLowerCase()) || d.equipment.toLowerCase().includes(search.toLowerCase()))
    if (equipment) filtered = filtered.filter(d => d.equipment === equipment)
    if (status)    filtered = filtered.filter(d => d.status === status)
    const total = filtered.length
    const data  = filtered.slice((page - 1) * pageSize, page * pageSize)
    return { data, total, totalPages: Math.ceil(total / pageSize), page, pageSize }
  }
}

export async function fetchDocument(id) {
  try {
    const res = await axiosInstance.get(`/knowledge/documents/${id}`)
    return res.data
  } catch {
    await new Promise(r => setTimeout(r, 220))
    const doc = MOCK_DOCS.find(d => d.id === id)
    if (!doc) throw new Error('Document not found')
    return doc
  }
}

export async function syncDocuments() {
  try {
    const res = await axiosInstance.post('/knowledge/documents/sync')
    return res.data
  } catch {
    await new Promise(r => setTimeout(r, 900))
    return { synced: randInt(2, 8), message: 'Sync completed successfully' }
  }
}

export async function reindexDocument(id) {
  try {
    const res = await axiosInstance.post(`/knowledge/documents/${id}/reindex`)
    return res.data
  } catch {
    await new Promise(r => setTimeout(r, 650))
    return { message: 'Document reindexed successfully' }
  }
}

export async function reindexAll() {
  try {
    const res = await axiosInstance.post('/knowledge/documents/reindex-all')
    return res.data
  } catch {
    await new Promise(r => setTimeout(r, 1100))
    return { queued: MOCK_DOCS.filter(d => d.status !== 'failed').length, message: 'All documents queued for reindexing' }
  }
}

export async function deleteDocument(id) {
  try {
    await axiosInstance.delete(`/knowledge/documents/${id}`)
  } catch {
    await new Promise(r => setTimeout(r, 400))
    // Mock: silently succeed
  }
}

// ─── Stats derived from same dataset ─────────────────────────────────────
// export async function fetchDocumentStats() {
//   await new Promise(r => setTimeout(r, 250))
//   return {
//     total:    MOCK_DOCS.length,
//     chunks:   MOCK_DOCS.reduce((s, d) => s + d.chunk_count, 0),
//     indexed:  MOCK_DOCS.filter(d => d.status === 'indexed').length,
//     failed:   MOCK_DOCS.filter(d => d.status === 'failed').length,
//   }
// }
export async function fetchDocumentStats() {
  const result = await fetchDocuments()

  const docs = result.data

  return {
    total: docs.length,
    chunks: docs.reduce(
      (sum, doc) => sum + (doc.chunk_count || 0),
      0
    ),
    indexed: docs.filter(
      doc => doc.status === 'indexed'
    ).length,
    failed: docs.filter(
      doc => doc.status === 'failed'
    ).length,
  }
}

export const UNIQUE_EQUIPMENT = [...new Set(EQUIPMENT_NAMES)].sort()
export const STATUS_OPTIONS   = ['indexed', 'pending', 'failed']
