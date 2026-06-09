import { useMemo, useState } from 'react'
import { GraduationCap, RotateCcw, Menu, X } from 'lucide-react'
import roadmap from './data/roadmap.json'
import Sidebar from './components/Sidebar'
import ProgressBar from './components/ProgressBar'
import ChapterView from './components/ChapterView'
import ThemeToggle from './components/ThemeToggle'
import { useProgress } from './hooks/useProgress'

export default function App() {
  const { isDone, toggle, reset } = useProgress()
  const [activeId, setActiveId] = useState(roadmap.domains[0].sections[0].id)
  const [mobileNav, setMobileNav] = useState(false)

  const allSections = useMemo(
    () => roadmap.domains.flatMap(d => d.sections.map(s => ({ ...s, domain: d }))),
    []
  )
  const total = allSections.length
  const done = allSections.filter(s => isDone(s.id)).length

  const activeEntry = allSections.find(s => s.id === activeId)

  const domainProgress = (domain) => {
    const totalD = domain.sections.length
    const doneD = domain.sections.filter(s => isDone(s.id)).length
    return { done: doneD, total: totalD }
  }

  const handleSelect = (id) => {
    setActiveId(id)
    setMobileNav(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-30">
        <div className="px-4 lg:px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setMobileNav(v => !v)}
            className="lg:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-700"
            aria-label="Toggle navigation"
          >
            {mobileNav ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-sm leading-tight">{roadmap.title}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{roadmap.subtitle}</p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-auto">
            <ProgressBar done={done} total={total} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (confirm('Reset all progress?')) reset() }}
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden lg:block h-[calc(100vh-65px)]">
          <Sidebar
            domains={roadmap.domains}
            activeId={activeId}
            onSelect={handleSelect}
            isDone={isDone}
            domainProgress={domainProgress}
          />
        </div>

        {/* Mobile sidebar */}
        {mobileNav && (
          <div className="lg:hidden fixed inset-0 z-20 pt-16">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNav(false)} />
            <div className="relative h-full max-w-xs">
              <Sidebar
                domains={roadmap.domains}
                activeId={activeId}
                onSelect={handleSelect}
                isDone={isDone}
                domainProgress={domainProgress}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <ChapterView
            section={activeEntry}
            domain={activeEntry?.domain}
            isDone={isDone}
            onToggle={toggle}
          />
        </main>
      </div>
    </div>
  )
}