"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Answers, Recommendation } from "@/lib/types"
import { mockRecommendation } from "@/lib/mock-data"
import { SuppliesList } from "./supplies-list"
import { AdviceList } from "./advice-list"
import { RecommendedPlan } from "./recommended-plan"
import { EmergencyBagList } from "./emergency-bag-list"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const [answers, setAnswers] = useState<Answers | null>(null)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        let decodedData: Answers | null = null

        // URLからデータを取得
        const dataParam = searchParams.get("data")

        if (dataParam) {
          try {
            decodedData = JSON.parse(decodeURIComponent(dataParam)) as Answers
            setAnswers(decodedData)
          } catch (parseError) {
            console.error("データの解析中にエラーが発生しました:", parseError)
          }
        }

        // 実際のアプリケーションでは、ここでAPIを呼び出して推奨事項を取得します
        // 今回はモックデータを使用
        await new Promise((resolve) => setTimeout(resolve, 500)) // ローディング表示のための遅延
        setRecommendation(mockRecommendation)
        // 診断結果をサーバに保存
        if (decodedData) {
          const payload = {
            hnMemberId: "", // HN会員IDを設定
            relationship: decodedData.members[0]?.role || "",
            answers: decodedData,
            recommendation: mockRecommendation,
            emergencyBagResult: mockRecommendation.emergencyItems || []
          }
          fetch("/api/diagnosis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          }).catch((err) => console.error("送信エラー:", err))
        }
      } catch (error) {
        console.error("結果の読み込み中にエラーが発生しました:", error)
      } finally {
        setLoading(false)
      }
    }

    // コンポーネントのマウント時に一度だけ実行
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 依存配列を空にして初回レンダリング時のみ実行

  if (loading) {
    return (
      <div className="diagnosis-container">
        {/* ヘッダー */}
        <header className="diagnosis-header">
          <div className="container mx-auto flex items-center justify-between max-w-6xl">
            <div>
              <span className="text-lg font-bold">HEBELIAN NET.</span>
              <span className="ml-2 text-sm">防災診断 Powered by pasobo</span>
            </div>
          </div>
        </header>

        <main className="diagnosis-content">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32 rounded-xl bg-gray-200" />
                ))}
            </div>
          </div>
        </main>

        <footer className="diagnosis-footer">
          <div className="container mx-auto max-w-6xl">
            <p className="copyright">Copyright© Asahi Kasei Homes Corporation. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  if (!recommendation) {
    return (
      <div className="diagnosis-container">
        {/* ヘッダー */}
        <header className="diagnosis-header">
          <div className="container mx-auto flex items-center justify-between max-w-6xl">
            <div>
              <span className="text-lg font-bold">HEBELIAN NET.</span>
              <span className="ml-2 text-sm">防災診断 Powered by pasobo</span>
            </div>
          </div>
        </header>

        <main className="diagnosis-content">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-lg border-slate-200">
              <CardHeader className="bg-slate-800 text-white rounded-t-xl">
                <CardTitle className="text-2xl text-center">エラーが発生しました</CardTitle>
                <CardDescription className="text-center text-slate-300">
                  診断結果の取得中にエラーが発生しました。もう一度お試しください。
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <Button asChild className="next-button">
                  <Link href="/diagnose" className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    診断をやり直す
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="diagnosis-footer">
          <div className="container mx-auto max-w-6xl">
            <p className="copyright">Copyright© Asahi Kasei Homes Corporation. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="diagnosis-container">
      {/* ヘッダー */}
      <header className="diagnosis-header">
        <div className="container mx-auto flex items-center justify-between max-w-6xl">
          <div>
            <span className="text-lg font-bold">HEBELIAN NET.</span>
            <span className="ml-2 text-sm">防災診断 Powered by pasobo</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-white hover:bg-gray-700"
              aria-label="診断に戻る"
            >
              <Link href="/diagnose">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-white hover:bg-gray-700"
              aria-label="診断をやり直す"
            >
              <Link href="/diagnose">
                <RefreshCw className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="diagnosis-content">
        <div className="container mx-auto max-w-4xl">
          {/* タイトルセクション */}
          <div className="text-center mb-8">
            <div className="step-indicator mb-4">診断結果をお届けします</div>
            <h1 className="step-title">あなたの備蓄診断結果</h1>
            <p className="step-description">
              回答に基づいて、あなたの家庭が確認しておくべき行動と準備が必要なものをご提案します。
            </p>
          </div>

          {/* セクション */}
          <div className="space-y-12">
            {/* 防災アドバイス */}
            <section id="advice-section">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "hsl(var(--orange))" }}
                    >
                      1
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">防災アドバイス</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        今すぐ実施できるあなたの防災行動
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AdviceList advice={recommendation.advice} answers={answers} />
                </CardContent>
              </Card>
            </section>

            {/* 備蓄リスト */}
            <section id="supplies-section">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "hsl(var(--orange))" }}
                    >
                      2
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">備蓄リスト</CardTitle>
                      <CardDescription className="text-sm text-gray-600">自宅に備えておこう</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <SuppliesList supplies={recommendation.supplies} answers={answers} />
                </CardContent>
              </Card>
            </section>

            {/* 持ち出し品リスト */}
            <section id="emergency-bag-section">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "hsl(var(--orange))" }}
                    >
                      3
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">持ち出し品リスト</CardTitle>
                      <CardDescription className="text-sm text-gray-600">外に避難するときはこれ</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <EmergencyBagList answers={answers} />
                </CardContent>
              </Card>
            </section>

            {/* おすすめ防災商品 */}
            <section id="recommended-plan-section">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "hsl(var(--orange))" }}
                    >
                      4
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">おすすめ防災商品</CardTitle>
                      <CardDescription className="text-sm text-gray-600">まずはここから揃えよう！</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecommendedPlan plan={recommendation.plan} />
                </CardContent>
              </Card>
            </section>
          </div>

          {/* フッターアクション */}
          <div className="mt-12 text-center">
            <Button asChild className="next-button px-8 py-3 text-lg font-medium">
              <Link href="/diagnose">もう一度診断する</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="diagnosis-footer">
        <div className="container mx-auto max-w-6xl">
          <p className="copyright">Copyright© Asahi Kasei Homes Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
