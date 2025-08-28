import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function useTheme() {
  const getInitial = () => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitial)
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  return { theme, setTheme }
}

export default function App() {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-neutral-900 dark:text-neutral-100 transition-colors relative z-10">
      <header className="relative z-20 bg-white/70 dark:bg-neutral-900/70 backdrop-blur border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-xl font-semibold tracking-tight">KavachKYC</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className={pathname === '/' ? 'font-semibold' : ''}>Home</Link>
            <Link to="/upload" className={pathname.startsWith('/upload') ? 'font-semibold' : ''}>Upload</Link>
            <Link to="/dashboard" className={pathname.startsWith('/dashboard') ? 'font-semibold' : ''}>Dashboard</Link>
            <button
              aria-label="Toggle dark mode"
              onClick={toggle}
              className="ml-2 inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-neutral-700 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {theme === 'dark' ? (
                <span className="flex items-center gap-1">🌙 <span className="hidden sm:inline">Dark</span></span>
              ) : (
                <span className="flex items-center gap-1">☀️ <span className="hidden sm:inline">Light</span></span>
              )}
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <footer className="relative z-10 text-center text-xs text-gray-500 dark:text-neutral-400 py-6">© {new Date().getFullYear()} KavachKYC</footer>
    </div>
  )
}
