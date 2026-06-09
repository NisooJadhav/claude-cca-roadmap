import { ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar({ domains, activeId, onSelect, isDone, domainProgress }) {
  const [expanded, setExpanded] = useState(() => {
    const init = {}
    domains.forEach(d => { init[d.id] = true })
    return init
  })

  const toggleExpand = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  return (
    <aside className="w-full lg:w-80 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-full overflow-y-auto">
      <div className="p-4 space-y-2">
        {domains.map(d => {
          const { done, total } = domainProgress(d)
          const open = expanded[d.id]
          return (
            <div key={d.id} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => toggleExpand(d.id)}
                className="w-full flex items-center justify-between p-3 text-left bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {open ? <ChevronDown size={16} className="shrink-0" /> : <ChevronRight size={16} className="shrink-0" />}
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{d.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Weight {d.weight} · {done}/{total}
                    </div>
                  </div>
                </div>
              </button>

              {open && (
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {d.sections.map(s => {
                    const active = s.id === activeId
                    const completed = isDone(s.id)
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => onSelect(s.id)}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm transition ${
                            active
                              ? 'bg-brand-50 dark:bg-brand-700/20 text-brand-700 dark:text-brand-500 font-medium'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }`}
                        >
                          {completed
                            ? <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                            : <Circle size={16} className="text-gray-400 shrink-0" />}
                          <span className="truncate">{s.title}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}