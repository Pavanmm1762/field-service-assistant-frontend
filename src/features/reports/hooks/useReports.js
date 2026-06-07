import { useState, useEffect, useCallback } from 'react'
import {
  fetchReportSummary,
  fetchSeverityDistribution,
  fetchJobTrend,
  fetchEquipmentBreakdown,
  fetchTechnicianLeaderboard,
} from '../api/reportsApi'

export function useReports() {
  const [summary, setSummary]   = useState(null)
  const [severity, setSeverity] = useState([])
  const [trend, setTrend]       = useState([])
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchReportSummary(),
      fetchSeverityDistribution(),
      fetchJobTrend(),
      fetchEquipmentBreakdown(),
    ]).then(([s, sev, t, eq]) => {
      setSummary(s)
      setSeverity(sev)
      setTrend(t)
      setEquipment(eq)
    }).finally(() => setLoading(false))
  }, [])

  return { summary, severity, trend, equipment, loading }
}

export function useTechLeaderboard() {
  const [data, setData]         = useState([])
  const [page, setPage]         = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal]       = useState(0)
  const [loading, setLoading]   = useState(true)
  const PAGE_SIZE = 5

  const load = useCallback(async (p) => {
    setLoading(true)
    const res = await fetchTechnicianLeaderboard({ page: p, pageSize: PAGE_SIZE })
    setData(res.data)
    setTotal(res.total)
    setTotalPages(res.totalPages)
    setLoading(false)
  }, [])

  useEffect(() => { load(page) }, [page, load])

  return { data, page, setPage, totalPages, total, loading, pageSize: PAGE_SIZE }
}
