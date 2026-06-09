import { CheckCircle2, Circle, BookOpen } from 'lucide-react'

export default function LearningSection({ section, isDone, onToggle }) {
  const done = isDone(section.id)
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-500">
          <BookOpen size={18} />
          <h3 className="font-semibold">Learning</h3>
        </div>
        <button
          onClick={() => onToggle(section.id)}
          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border transition ${
            done
              ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-800 text-green-700 dark:text-green-400'
              : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          {done ? 'Completed' : 'Mark complete'}
        </button>
      </div>
      <ul className="space-y-2.5">
        {section.learning.map((p, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed">
            <span className="text-brand-500 font-bold shrink-0">›</span>
            <span dangerouslySetInnerHTML={{ __html: formatInline(p) }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function formatInline(text) {
  // wrap `code` inline
  return text.replace(/`([^`]+)`/g, '<code>$1</code>')
}