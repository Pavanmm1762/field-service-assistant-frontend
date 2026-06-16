import { Routes, Route } from 'react-router-dom'
import AssistantPage from '../assistant/AssistantPage'
import HistoryPage   from '../history/HistoryPage'
import DocumentsPage from '../documents/DocumentsPage'
import ReportsPage   from '../reports/ReportsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"        element={<AssistantPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="*"        element={<AssistantPage />} />
    </Routes>
  )
}
