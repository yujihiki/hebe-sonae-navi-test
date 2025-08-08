"use client"

interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

export function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className={`progress-container ${className}`}>
      <div className="progress-text">
        {current}/{total}
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
