import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './store/AppContext'
import { Header } from './app/dashboard/Header'
import { Hero } from './app/dashboard/Hero'
import AppRoutes from './app/routes'
import './styles/globals.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-surface-950 relative">
          {/* Noise overlay */}
          <div className="noise-overlay" />

          {/* Ambient bg glow */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <Header />
            <Hero />
            <main>
              <AppRoutes />
            </main>
          </div>
        </div>
      </AppProvider>
    </BrowserRouter>
  )
}
