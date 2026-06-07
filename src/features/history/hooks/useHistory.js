import { useState, useEffect, useCallback } from 'react'
import { fetchHistory, fetchSession } from '../api/historyApi'

const PAGE_SIZE = 9

export function useHistory() {
  const [records, setRecords]     = useState([])
  const [total, setTotal]         = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage]           = useState(1)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [stats, setStats]         = useState({ total: 0, critical: 0, open: 0, resolved: 0 })
  const [filters, setFilters]     = useState({ severity: '', status: '', search: '' })

  const load = useCallback(async (p, f) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchHistory({ page: p, pageSize: PAGE_SIZE, ...f })
      setRecords(res.data)
      setTotal(res.total)
      setTotalPages(res.totalPages)
      setStats({
        total: res.total,

        critical: res.data.filter(
          s => s.severity === 'Critical'
        ).length,

        open: res.data.filter(
          s => s.status === 'Open'
        ).length,

        resolved: res.data.filter(
          s => s.status === 'Resolved'
        ).length
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(page, filters) }, [page, filters, load])

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({ severity: '', status: '', search: '' })
    setPage(1)
  }, [])

  return {
    records, total, totalPages, page, setPage,
    loading, error, filters, updateFilter, clearFilters,
    stats, pageSize: PAGE_SIZE,
  }
}

export function useSession(id) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetchSession(id)
      .then(setSession)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { session, loading, error }
}
