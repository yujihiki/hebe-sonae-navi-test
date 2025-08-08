"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface RecommendedPlanProps {
  plan: { title: string; description: string; cta: string }
}

export function RecommendedPlan({ plan }: RecommendedPlanProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-slate-800">まずはここから揃えよう！</h2>
        <div className="text-2xl font-bold text-slate-800 border-b-2 border-yellow-400 pb-2 mb-4">おすすめ防災用品</div>
      </div>
      <p className="text-slate-600 mb-6">
        ヘーベルハウスでは、あなたの住まいの防災対策をワンストップでサポートする防災サービスを提供しております。
        管理の手間が不要で、お住まいにあった最適な設計。快適な避難生活をサポートする内容となっています。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 商品1 - 防災ボックス */}
        <Card className="border-slate-200 hover:border-yellow-300 transition-colors shadow-sm hover:shadow-md">
          <CardHeader className="pb-2 bg-slate-50 rounded-t-lg">
            <CardTitle className="text-lg text-slate-800">在宅避難におすすめ防災ボックス</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="aspect-video bg-slate-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/hebelbox.png"
                alt="在宅避難におすすめ防災ボックス"
                width={300}
                height={200}
                className="h-full w-full object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=200&width=300&text=防災ボックス"
                }}
              />
            </div>
            <p className="text-slate-600 mb-4">
              在宅避難に特化した備蓄用品をまとめた便利な防災セットです。へーべルハウスの標準的なクローゼット規格にあった備蓄収納箱に、日常生活でなかなか買う機会が少ないものを中心にセレクトしてお届けします。
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="bg-yellow-100 p-1 rounded-full text-yellow-600 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="text-sm text-slate-700">在宅避難に特化</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-yellow-100 p-1 rounded-full text-yellow-600 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="text-sm text-slate-700">インテリアに調和するデザイン</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-yellow-100 p-1 rounded-full text-yellow-600 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="text-sm text-slate-700">必要な防災グッズをすぐに取り出せる設計</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full next-button">詳細を見る</Button>
          </CardFooter>
        </Card>

        {/* 商品2 - 備蓄食品 */}
        <Card className="border-slate-200 hover:border-yellow-300 transition-colors shadow-sm hover:shadow-md">
          <CardHeader className="pb-2 bg-slate-50 rounded-t-lg">
            <CardTitle className="text-lg text-slate-800">美味しい備蓄食の定期配送プラン</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="aspect-video bg-slate-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/food.webp"
                alt="美味しい備蓄食品 定期配送プラン"
                width={300}
                height={200}
                className="h-full w-full object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=200&width=300&text=備蓄食品"
                }}
              />
            </div>
            <p className="text-slate-600 mb-4">
              美味しい備蓄食品を18食分お届けするプランです。賞味期限になる前に次の食事を自動でお届けすることで、備蓄管理の手間を削減。ローリングストックにおすすめです。
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="bg-yellow-100 p-1 rounded-full text-yellow-600 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="text-sm text-slate-700">美味しい備蓄食品をまとめてお届け</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-yellow-100 p-1 rounded-full text-yellow-600 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="text-sm text-slate-700">自動でお届けするため管理の手間を削減</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-yellow-100 p-1 rounded-full text-yellow-600 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="text-sm text-slate-700">ローリングストックに最適</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full next-button">詳細を見る</Button>
          </CardFooter>
        </Card>
      </div>
      {/* 診断者限定クーポン */}
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl shadow-sm">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-slate-900 rounded-full font-bold text-lg mb-2">
            🎫 診断者限定クーポン
          </div>
          <h3 className="text-xl font-bold text-slate-800">防災食7日間セット</h3>
          <p className="text-lg font-semibold text-red-600">定期購入初回10%OFF</p>
        </div>

        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-yellow-400 mb-4">
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-2">クーポンコード</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-2xl font-mono font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-md">
                bousai7teiki
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard
                    .writeText("bousai7teiki")
                    .then(() => {
                      alert("クーポンコードをコピーしました")
                    })
                    .catch(() => {
                      alert("コピーに失敗しました")
                    })
                }}
                className="text-xs"
              >
                コピー
              </Button>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 space-y-1">
          <p>※半角英数字でご入力ください。</p>
          <p>※他クーポンとの併用はできません。</p>
          <p>※お一人様、1回限りご使用いただけます。</p>
          <p>※注文確定後は適用いただけませんので、ご注意ください。</p>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button className="px-8 py-6 text-lg next-button font-medium shadow-lg hover:shadow-xl transition-all duration-300">
          防災用品をもっと見る
        </Button>
      </div>
    </div>
  )
}
