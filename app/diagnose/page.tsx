"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { DiagnosisLoadingScreen } from "@/components/diagnosis-loading-screen"
import { Step1Form } from "./step1-form"
import { Step2Form } from "./step2-form"
import { Step3Form } from "./step3-form"
import { Step4Form } from "./step4-form"
import { Step5Form } from "./step5-form"
import { Step6Form } from "./step6-form"
import type { Answers } from "@/lib/types"

const TOTAL_STEPS = 6

const stepInfo = [
  { step: 1, title: "家族構成", description: "あなたの世帯に住んでいる方\n全員について教えてください。" },
  { step: 2, title: "ご家族の特徴", description: "あなたのご家族の中に、以下に当てはまる\n人を選択してください。 これにより、\nより適切な備蓄プランを診断します。" },
  { step: 3, title: "ローリングストック", description: "ローリングストックとは、普段から少し多めに\n食料や日用品を買っておき、 使ったら補充する\n備蓄方法です。あなたはローリングストックを\n実践していますか？" },
  { step: 4, title: "車の保有", description: "災害時、車は避難や物資の運搬に役立ちます。\nあなたの世帯では車を保有していますか？" },
  { step: 5, title: "電源確保", description: "災害時の停電に備えて、どのような\n電源確保の手段をお持ちですか？\n当てはまるものをすべて選択してください。" },
  { step: 6, title: "災害対策の実施状況", description: "現在、防災に関してお困りのことや不安に\n感じていることはありますか？\n当てはまるものをすべて選択してください。" },
]

export default function DiagnosePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [submittedData, setSubmittedData] = useState<Answers | null>(null)
  const router = useRouter()

  const methods = useForm<Answers>({
    // resolverを一時的に無効化
    mode: "onSubmit",
    shouldFocusError: false,
    defaultValues: {
      members: [{ role: "self", gender: "male", age: 40 }],
      specialNeeds: {},
      rollingStock: false,
      hasCar: false,
      powerBackup: ["none"],
      disasterConcerns: {},
    },
  })

  const { handleSubmit, trigger, getValues, formState } = methods

  // ステップが変更されたときの処理
  useEffect(() => {
    console.log("Step changed to:", currentStep)
    setCanSubmit(false) // ステップ変更時は送信を無効化

    // ステップ6に到達したら、少し遅延してから送信を有効化
    if (currentStep === TOTAL_STEPS) {
      console.log("Reached final step, enabling submit after delay")
      const timer = setTimeout(() => {
        setCanSubmit(true)
        console.log("Submit enabled")
      }, 100) // 100ms遅延

      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const onSubmit = async (data: Answers) => {
    console.log("onSubmit called - currentStep:", currentStep, "canSubmit:", canSubmit, "isSubmitting:", isSubmitting)

    // 送信条件の厳密なチェック
    if (!canSubmit || isSubmitting || currentStep !== TOTAL_STEPS) {
      console.log("Submit blocked - canSubmit:", canSubmit, "isSubmitting:", isSubmitting, "currentStep:", currentStep)
      return
    }

    try {
      setIsSubmitting(true)
      console.log("Starting submission process with data:", data)

      // 手動バリデーション
      const isValid = await validateAllSteps(data)
      if (!isValid) {
        console.log("Validation failed")
        setIsSubmitting(false)
        return
      }

      // データを保存してローディング画面を表示
      setSubmittedData(data)
      setShowLoading(true)
    } catch (error) {
      console.error("診断エラー:", error)
      alert("診断中にエラーが発生しました。もう一度お試しください。")
      setIsSubmitting(false)
    }
  }

  // ローディング完了時の処理
  const handleLoadingComplete = () => {
    if (submittedData) {
      console.log("Loading complete, navigating to result page")
      // データをURLパラメータとして結果ページに渡す
      const encodedData = encodeURIComponent(JSON.stringify(submittedData))
      router.push(`/result?data=${encodedData}`)
    }
  }

  // 手動バリデーション関数
  const validateAllSteps = async (data: Answers): Promise<boolean> => {
    // ステップ1: 家族構成
    if (!data.members || data.members.length === 0) {
      alert("家族構成を入力してください")
      return false
    }

    for (const member of data.members) {
      if (!member.gender || member.age < 0 || member.age > 120) {
        alert("家族構成の入力に不備があります")
        return false
      }
    }

    // ステップ3: ローリングストック
    if (typeof data.rollingStock !== "boolean") {
      alert("ローリングストックの選択をしてください")
      return false
    }

    // ステップ4: 車の保有
    if (typeof data.hasCar !== "boolean") {
      alert("車の保有状況を選択してください")
      return false
    }

    // ステップ5: 電源確保
    if (!data.powerBackup || data.powerBackup.length === 0) {
      alert("電源確保の選択をしてください")
      return false
    }

    return true
  }

  const nextStep = async () => {
    try {
      console.log("nextStep called - currentStep:", currentStep)

      // 最終ステップでは次に進まない
      if (currentStep >= TOTAL_STEPS) {
        console.log("Already on final step")
        return
      }

      // 現在のステップのバリデーション
      const isValid = await validateCurrentStep()

      if (isValid) {
        const nextStepNumber = currentStep + 1
        console.log("Moving to step:", nextStepNumber)
        setCurrentStep(nextStepNumber)
      }
    } catch (error) {
      console.error("nextStep error:", error)
    }
  }

  const validateCurrentStep = async (): Promise<boolean> => {
    const data = getValues()

    switch (currentStep) {
      case 1:
        if (!data.members || data.members.length === 0) {
          alert("家族構成を入力してください")
          return false
        }
        for (const member of data.members) {
          if (!member.gender || member.age < 0 || member.age > 120) {
            alert("家族構成の入力に不備があります。年齢を正しく入力してください。")
            return false
          }
        }
        return true

      case 2:
        // 任意選択なのでバリデーションスキップ
        return true

      case 3:
        if (typeof data.rollingStock !== "boolean") {
          alert("ローリングストックの選択をしてください")
          return false
        }
        return true

      case 4:
        if (typeof data.hasCar !== "boolean") {
          alert("車の保有状況を選択してください")
          return false
        }
        return true

      case 5:
        if (!data.powerBackup || data.powerBackup.length === 0) {
          methods.setValue("powerBackup", ["none"])
        }
        return true

      case 6:
        // 任意選択なのでバリデーションスキップ
        return true

      default:
        return true
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submit event triggered - currentStep:", currentStep, "canSubmit:", canSubmit)

    // 厳密な送信条件チェック
    if (currentStep !== TOTAL_STEPS || !canSubmit) {
      console.log("Form submission prevented")
      return
    }

    console.log("Proceeding with form submission")
    handleSubmit(onSubmit)(e)
  }

  const renderStepForm = () => {
    console.log("Rendering step:", currentStep)
    switch (currentStep) {
      case 1:
        return <Step1Form />
      case 2:
        return <Step2Form />
      case 3:
        return <Step3Form />
      case 4:
        return <Step4Form />
      case 5:
        return <Step5Form />
      case 6:
        console.log("Rendering Step6Form")
        return <Step6Form />
      default:
        return <Step1Form />
    }
  }

  // ローディング画面を表示する場合
  if (showLoading) {
    return <DiagnosisLoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <FormProvider {...methods}>
      <div className="diagnosis-container">
        {/* ヘッダー */}
        <header className="bg-black text-white p-4">
          <div className="container mx-auto flex items-center">
            <Image src="/images/hhp-logo.svg" alt="HEBELIAN NET." width={148} height={16} />
            <span className="ml-4">防災診断 Powerd by pasobo</span>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="diagnosis-content">
          <div className="container mx-auto max-w-md p-4">
            {/* プログレスバー */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-sm font-bold text-gray-700">
                {currentStep}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-orange-500 h-2.5 rounded-full"
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                />
              </div>
              <div className="text-sm font-bold text-gray-500">
                {TOTAL_STEPS}
              </div>
            </div>

            {/* ステップタイトル */}
            <div className="text-center mb-4">
              <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                ステップ {currentStep}
              </span>
              <h1 className="text-2xl font-bold mt-2">{stepInfo[currentStep - 1].title}</h1>
            </div>
            <p className="text-center text-gray-600 mb-8 whitespace-pre-line">
              {stepInfo[currentStep - 1].description}
            </p>

            {/* フォーム */}
            <form onSubmit={handleFormSubmit} className="form-container" noValidate>
              {renderStepForm()}

              {/* ナビゲーションボタン */}
              <div className="navigation-buttons">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    戻る
                  </Button>
                )}

                {currentStep < TOTAL_STEPS ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-[2] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: "hsl(25, 95%, 53%)" }}
                  >
                    次へ
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-[2] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    style={{ backgroundColor: !canSubmit || isSubmitting ? "#9ca3af" : "hsl(25, 95%, 53%)" }}
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? "診断中..." : "診断する"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </main>

        {/* フッター */}
        <footer className="diagnosis-footer">
          <div className="container mx-auto max-w-6xl">
            <p className="copyright">Copyright© Asahi Kasei Homes Corporation. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </FormProvider>
  )
}
