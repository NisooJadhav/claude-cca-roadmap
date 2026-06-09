import { useCallback, useEffect, useState } from 'react'

const KEY = 'cc-progress-v1'

export function useProgress() {
  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : {}
    } catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(completed))
  }, [completed])

  const toggle = useCallback((id) => {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const reset = useCallback(() => setCompleted({}), [])

  const isDone = useCallback((id) => !!completed[id], [completed])

  return { completed, toggle, reset, isDone }
}