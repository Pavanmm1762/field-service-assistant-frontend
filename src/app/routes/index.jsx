import { Routes, Route } from 'react-router-dom'
import AssistantPage from '../assistant/AssistantPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AssistantPage />} />
      <Route path="*" element={<AssistantPage />} />
    </Routes>
  )
}
