import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchDocuments, fetchDocumentStats, syncDocuments, reindexAll, reindexDocument, deleteDocument } from '../api/documentsApi'

const PAGE_SIZE = 10

// ─── useDocuments: list with filters + pagination ─────────────────────────
export function useDocuments() {
  const [records, setRecords]     = useState([])
  const [total, setTotal]         = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage]           = useState(1)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [filters, setFilters]     = useState({ search: '', equipment: '', status: '' })

  const debounceRef = useRef(null)

  const load = useCallback(async (p, f) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchDocuments({ page: p, pageSize: PAGE_SIZE, ...f })
      setRecords(res.data)
      setTotal(res.total)
      setTotalPages(res.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => load(page, filters), filters.search ? 300 : 0)
    return () => clearTimeout(debounceRef.current)
  }, [page, filters, load])

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({ search: '', equipment: '', status: '' })
    setPage(1)
  }, [])

  const refresh = useCallback(() => load(page, filters), [page, filters, load])

  return {
    records, total, totalPages, page, setPage,
    loading, error, filters, updateFilter, clearFilters,
    refresh, pageSize: PAGE_SIZE,
  }
}

// ─── useDocumentStats: KPI cards ──────────────────────────────────────────
export function useDocumentStats() {
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchDocumentStats()
      setStats(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { stats, loading, refresh: load }
}

// ─── useDocumentActions: sync / reindex / delete with toast-like state ────
export function useDocumentActions({ onSuccess } = {}) {
  const [pending, setPending] = useState({}) // { [id|action]: true }

  const setOp  = (key, val) => setPending(p => ({ ...p, [key]: val }))
  const clearOp = key => setPending(p => { const n = { ...p }; delete n[key]; return n })

  const runSync = useCallback(async () => {
    setOp('sync', true)
    try {
      const res = await syncDocuments()
      onSuccess?.(`Synced ${res.synced ?? ''} documents successfully`)
      return res
    } finally { clearOp('sync') }
  }, [onSuccess])

  const runReindexAll = useCallback(async () => {
    setOp('reindex-all', true)
    try {
      const res = await reindexAll()
      onSuccess?.(res.message || 'All documents queued for reindexing')
      return res
    } finally { clearOp('reindex-all') }
  }, [onSuccess])

  const runReindex = useCallback(async (id) => {
    setOp(`reindex-${id}`, true)
    try {
      const res = await reindexDocument(id)
      onSuccess?.(res.message || 'Document reindexed')
      return res
    } finally { clearOp(`reindex-${id}`) }
  }, [onSuccess])

  const runDelete = useCallback(async (id) => {
    setOp(`delete-${id}`, true)
    try {
      await deleteDocument(id)
      onSuccess?.('Document deleted')
    } finally { clearOp(`delete-${id}`) }
  }, [onSuccess])

  return {
    pending,
    isSyncing:     !!pending['sync'],
    isReindexingAll: !!pending['reindex-all'],
    isReindexing:  (id) => !!pending[`reindex-${id}`],
    isDeleting:    (id) => !!pending[`delete-${id}`],
    runSync, runReindexAll, runReindex, runDelete,
  }
}
