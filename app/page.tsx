import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, BookOpen, Clock3 } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* ヒーローセクション */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/80"></div>
        </div>
        <div className="container relative px-4 py-12 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">あなたの暮らしを守る</span>
            <span className="block mt-2">
              <span className="text-yellow-400">備蓄診断（仮称）</span>
            </span>
          </h1>
          <p className="max-w-md mx-auto mt-6 text-lg text-slate-300 leading-relaxed">
            あなたの生活スタイルに合わせた、最適な備蓄プランをご提案。
            1分であなたの家に必要な備蓄がわかります。
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/diagnose">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                はじめる
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800">あなたに最適な備蓄プラン</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
          <p className="max-w-2xl mx-auto mt-6 text-center text-slate-600 leading-relaxed">
            家族構成やライフスタイルに合わせて、あなたのお家に備えておくべき内容をご提案します。
          </p>

          <div className="grid gap-8 mt-16 md:grid-cols-3">
            <div className="p-8 transition-all bg-white border rounded-xl border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200">
              <div className="w-14 h-14 mb-6 rounded-full bg-yellow-50 flex items-center justify-center">
                <Shield className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-800">パーソナライズ</h3>
              <p className="text-slate-600 leading-relaxed">
                あなたの家族構成や特別なニーズに合わせた、最適な備蓄リストを提案します。
              </p>
            </div>

            <div className="p-8 transition-all bg-white border rounded-xl border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200">
              <div className="w-14 h-14 mb-6 rounded-full bg-yellow-50 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-800">実用的なアドバイス</h3>
              <p className="text-slate-600 leading-relaxed">
                専門家監修の実践的なアドバイスで、いざという時に役立つ知識を提供します。
              </p>
            </div>

            <div className="p-8 transition-all bg-white border rounded-xl border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-200">
              <div className="w-14 h-14 mb-6 rounded-full bg-yellow-50 flex items-center justify-center">
                <Clock3 className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-800">簡単3ステップ</h3>
              <p className="text-slate-600 leading-relaxed">
                たった3分の簡単な質問に答えるだけで、あなたに最適な防災プランが完成します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-24 bg-slate-100">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800">今日から始める、安心の備え</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
          <p className="max-w-2xl mx-auto mt-6 text-slate-600 leading-relaxed">
            災害はいつ起こるかわかりません。今日から始める防災対策で、大切な人と自分を守りましょう。
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/diagnose">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                診断を始める
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-sm">© {new Date().getFullYear()} KOKUA,Inc. All rights reserved.</p>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-sm hover:text-yellow-400 transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="#" className="text-sm hover:text-yellow-400 transition-colors">
                利用規約
              </Link>
              <Link href="#" className="text-sm hover:text-yellow-400 transition-colors">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
