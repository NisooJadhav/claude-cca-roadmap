export default function ProgressBar({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1.5 font-medium">
        <span>Progress</span>
        <span>{done}/{total} · {pct}%{pct === 100 ? ' 🎉' : ''}</span>
      </div>
      <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}