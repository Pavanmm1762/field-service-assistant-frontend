import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [systemStatus] = useState('online') // 'online' | 'degraded' | 'offline'

  return (
    <AppContext.Provider value={{ analysisResult, setAnalysisResult, systemStatus }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
