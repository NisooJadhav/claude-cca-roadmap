import { useState } from 'react'
import { Brain, Check, X, RotateCcw } from 'lucide-react'

export default function QuizSection({ section }) {
  const [answers, setAnswers] = useState({})
  const [revealed, setRevealed] = useState({})

  const reset = () => { setAnswers({}); setRevealed({}) }

  const submit = (qIdx) => setRevealed(r => ({ ...r, [qIdx]: true }))

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-500">
          <Brain size={18} />
          <h3 className="font-semibold">Quiz</h3>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div className="space-y-6">
        {section.quiz.map((q, qIdx) => {
          const picked = answers[qIdx]
          const shown = revealed[qIdx]
          return (
            <div key={qIdx} className="border-b border-gray-100 dark:border-gray-800 pb-5 last:border-0 last:pb-0">
              <div className="font-medium mb-3 text-sm">
                Q{qIdx + 1}. {q.q}
              </div>
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isPicked = picked === oIdx
                  const isCorrect = q.answer === oIdx
                  let cls = 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  if (shown) {
                    if (isCorrect) cls = 'border-green-400 bg-green-50 dark:bg-green-900/30 dark:border-green-700'
                    else if (isPicked) cls = 'border-red-400 bg-red-50 dark:bg-red-900/30 dark:border-red-700'
                    else cls = 'border-gray-200 dark:border-gray-800 opacity-60'
                  } else if (isPicked) {
                    cls = 'border-brand-500 bg-brand-50 dark:bg-brand-700/20'
                  }
                  return (
                    <button
                      key={oIdx}
                      disabled={shown}
                      onClick={() => setAnswers(a => ({ ...a, oIdx }))}
                      className={`w-full text-left text-sm px-3 py-2.5 rounded-lg border transition flex items-start gap-2 ${cls}`}
                    >
                      <span className="font-semibold shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                      <span className="flex-1">{opt}</span>
                      {shown && isCorrect && <Check size={16} className="text-green-600 shrink-0" />}
                      {shown && isPicked && !isCorrect && <X size={16} className="text-red-600 shrink-0" />}
                    </button>
                  )
                })}
              </div>

              {!shown && picked !== undefined && (
                <button
                  onClick={() => submit(qIdx)}
                  className="mt-3 text-sm px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium"
                >
                  Check answer
                </button>
              )}

              {shown && (
                <div className="mt-3 text-sm p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-l-4 border-brand-500">
                  <strong>Explanation:</strong> {q.explain}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}