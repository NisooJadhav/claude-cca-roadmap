import LearningSection from './LearningSection'
import QuizSection from './QuizSection'

export default function ChapterView({ section, domain, isDone, onToggle }) {
  if (!section) return (
    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
      Pick a section from sidebar.
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header>
        <div className="text-xs uppercase tracking-wider text-brand-600 dark:text-brand-500 font-semibold mb-1">
          {domain.title} · {domain.weight}
        </div>
        <h2 className="text-2xl font-bold">{section.title}</h2>
      </header>

      <LearningSection section={section} isDone={isDone} onToggle={onToggle} />
      <QuizSection section={section} />
    </div>
  )
}