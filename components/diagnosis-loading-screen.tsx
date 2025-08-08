"use client"

import { useEffect, useState } from "react"
import { Brain, CheckCircle2, Cpu, Database, LineChart, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface DiagnosisLoadingScreenProps {
  onComplete: () => void
  className?: string
}

export function DiagnosisLoadingScreen({ onComplete, className }: DiagnosisLoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    { icon: <Database className="w-5 h-5" />, text: "データを分析中..." },
  //  { icon: <Cpu className="w-5 h-5" />, text: "リスク評価を実行中..." },
    { icon: <Brain className="w-5 h-5" />, text: "最適な防災プランを生成中..." },
    { icon: <LineChart className="w-5 h-5" />, text: "レポートを作成中..." },
    { icon: <Sparkles className="w-5 h-5" />, text: "診断完了！" },
  ]

  useEffect(() => {
    // 進捗バーのアニメーション
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 40) // 4秒で100%になるように調整

    // ステップのアニメーション
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval)
          return steps.length - 1
        }
        return prev + 1
      })
    }, 1000) // 各ステップを約1秒ごとに進める

    // 3秒後に完了状態にする
    const timer = setTimeout(() => {
      setIsCompleted(true)
      // 完了コールバックを呼び出す
      onComplete()
    }, 4000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(timer)
    }
  }, [onComplete, steps.length])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-900/95 backdrop-blur-md",
        className,
      )}
    >
      <div className="w-full max-w-md p-8 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 shadow-2xl border border-blue-700/30">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-800/50 mb-4">
            <Sparkles className="w-8 h-8 text-[hsl(var(--gold))]" />
          </div>
          <h2 className="text-2xl font-bold text-white">備蓄診断中</h2>
          <p className="text-blue-200 mt-2">あなたに最適な備蓄プランを作成しています</p>
        </div>

        <div className="space-y-4 mb-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all",
                index <= currentStep ? "opacity-100" : "opacity-30",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  index < currentStep
                    ? "bg-green-900/30 text-green-400"
                    : index === currentStep
                      ? "bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] animate-pulse"
                      : "bg-blue-800/30 text-blue-500",
                )}
              >
                {index < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
              </div>
              <span
                className={cn(
                  "font-medium",
                  index < currentStep
                    ? "text-green-400"
                    : index === currentStep
                      ? "text-[hsl(var(--gold))]"
                      : "text-blue-400",
                )}
              >
                {step.text}
              </span>
              {index === currentStep && !isCompleted && (
                <Loader2 className="w-4 h-4 ml-auto animate-spin text-[hsl(var(--gold))]" />
              )}
            </div>
          ))}
        </div>

        <div className="w-full bg-blue-800/50 rounded-full h-2 mb-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[hsl(var(--gold))] to-amber-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-[hsl(var(--gold))]">{progress}% 完了</p>
      </div>
    </div>
  )
}
