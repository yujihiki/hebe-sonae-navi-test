"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import type { Answers, SupplyCategory } from "@/lib/types"
import {
  Copy,
  Mail,
  Utensils,
  Sparkles,
  Heart,
  Shield,
  Baby,
  Users,
  UserCheck,
  PawPrintIcon as Paw,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmergencyItem {
  name: string
  category: SupplyCategory | "personal"
  priority: "high" | "medium" | "low"
}

interface EmergencyBagListProps {
  answers?: Answers | null
}

export function EmergencyBagList({ answers }: EmergencyBagListProps) {
  // カテゴリー名の日本語マッピング
  const categoryNames: Record<SupplyCategory | "personal", string> = {
    food_water: "食品・水",
    hygiene: "衛生用品",
    daily_safety: "生活・安全用品",
    women: "女性用品",
    infant: "乳幼児用品",
    child: "子ども用品",
    elderly: "高齢者用品",
    pet: "ペット用品",
    personal: "個人用品",
  }

  // カテゴリーアイコンのマッピング
  const categoryIcons: Record<SupplyCategory | "personal", React.ComponentType<{ className?: string }>> = {
    food_water: Utensils,
    hygiene: Sparkles,
    daily_safety: Shield,
    women: Heart,
    infant: Baby,
    child: Users,
    elderly: UserCheck,
    pet: Paw,
    personal: User,
  }

  // 基本的な持ち出し品リスト
  const basicEmergencyItems: EmergencyItem[] = [
    // 食品・水
    { name: "飲料水", category: "food_water", priority: "high" },
    { name: "非常食", category: "food_water", priority: "high" },
    { name: "お菓子・栄養補助食品", category: "food_water", priority: "medium" },

    // 生活・安全用品
    { name: "懐中電灯", category: "daily_safety", priority: "high" },
    { name: "乾電池", category: "daily_safety", priority: "medium" },
    { name: "ラジオ", category: "daily_safety", priority: "high" },
    { name: "救急セット", category: "daily_safety", priority: "high" },
    { name: "ライター・マッチ", category: "daily_safety", priority: "medium" },
    { name: "ロープ", category: "daily_safety", priority: "medium" },
    { name: "軍手", category: "daily_safety", priority: "medium" },
    { name: "毛布・タオル", category: "daily_safety", priority: "medium" },
    { name: "レインコート", category: "daily_safety", priority: "medium" },

    // 衛生用品
    { name: "マスク", category: "hygiene", priority: "high" },
    { name: "ウェットティッシュ", category: "hygiene", priority: "high" },
    { name: "携帯用トイレ", category: "hygiene", priority: "high" },
    { name: "歯ブラシ・歯磨き粉", category: "hygiene", priority: "medium" },
    { name: "石鹸・消毒液", category: "hygiene", priority: "medium" },

    // 個人用品
    { name: "現金", category: "personal", priority: "high" },
    { name: "マイナンバーカード", category: "personal", priority: "high" },
    { name: "保険証", category: "personal", priority: "high" },
    { name: "携帯電話・充電器", category: "personal", priority: "high" },
    { name: "着替え", category: "personal", priority: "medium" },
    { name: "下着", category: "personal", priority: "medium" },
    { name: "靴下", category: "personal", priority: "medium" },
  ]

  // 特別なニーズに基づく追加アイテム
  const getSpecialNeedsItems = (): EmergencyItem[] => {
    const items: EmergencyItem[] = []

    if (answers?.specialNeeds?.allergy) {
      items.push(
        { name: "アレルギー対応食品", category: "food_water", priority: "high" },
        { name: "エピペン", category: "personal", priority: "high" },
      )
    }

    if (answers?.specialNeeds?.illness) {
      items.push(
        { name: "常備薬", category: "personal", priority: "high" },
        { name: "お薬手帳のコピー", category: "personal", priority: "high" },
      )
    }

    if (answers?.specialNeeds?.disability) {
      items.push(
        { name: "支援機器・道具", category: "personal", priority: "high" },
        { name: "障害者手帳のコピー", category: "personal", priority: "high" },
      )
    }

    if (answers?.specialNeeds?.heatSensitive) {
      items.push(
        { name: "携帯扇風機", category: "daily_safety", priority: "medium" },
        { name: "冷却シート", category: "hygiene", priority: "medium" },
      )
    }

    if (answers?.specialNeeds?.coldSensitive) {
      items.push(
        { name: "使い捨てカイロ", category: "daily_safety", priority: "medium" },
        { name: "防寒着", category: "personal", priority: "medium" },
      )
    }

    if (answers?.specialNeeds?.germSensitive) {
      items.push(
        { name: "除菌ウェットティッシュ", category: "hygiene", priority: "high" },
        { name: "使い捨て手袋", category: "hygiene", priority: "medium" },
      )
    }

    return items
  }

  // 家族構成に基づく追加アイテム
  const getFamilyItems = (): EmergencyItem[] => {
    const items: EmergencyItem[] = []

    // 女性用品
    if (answers?.members?.some((m) => m.gender === "female")) {
      items.push({ name: "生理用品", category: "women", priority: "high" })
    }

    // 乳幼児用品
    if (answers?.members?.some((m) => m.role === "child" && m.age < 3)) {
      items.push(
        { name: "粉ミルク", category: "infant", priority: "high" },
        { name: "哺乳瓶", category: "infant", priority: "high" },
        { name: "おむつ", category: "infant", priority: "high" },
        { name: "お尻拭き", category: "infant", priority: "high" },
      )
    }

    // 子ども用品
    if (answers?.members?.some((m) => m.role === "child" && m.age >= 3 && m.age < 12)) {
      items.push(
        { name: "お気に入りのおもちゃ", category: "child", priority: "medium" },
        { name: "子供用お菓子", category: "child", priority: "medium" },
      )
    }

    // 高齢者用品
    if (answers?.members?.some((m) => m.age >= 65 || m.role === "grandfather" || m.role === "grandmother")) {
      items.push(
        { name: "老眼鏡", category: "elderly", priority: "high" },
        { name: "入れ歯洗浄剤", category: "elderly", priority: "medium" },
      )
    }

    // ペット用品
    if (answers?.members?.some((m) => m.role === "pet")) {
      items.push(
        { name: "ペットフード", category: "pet", priority: "high" },
        { name: "ペット用水", category: "pet", priority: "high" },
        { name: "ペット用キャリー", category: "pet", priority: "high" },
        { name: "ペット用トイレ用品", category: "pet", priority: "medium" },
      )
    }

    return items
  }

  // 全アイテムを統合
  const allItems = [...basicEmergencyItems, ...getSpecialNeedsItems(), ...getFamilyItems()]

  // 世帯構成に基づいて表示すべきカテゴリーを判定
  const shouldShowCategory = (category: SupplyCategory | "personal"): boolean => {
    if (!answers) return true

    // 基本カテゴリーは常に表示
    if (["food_water", "hygiene", "daily_safety", "personal"].includes(category)) {
      return true
    }

    // 世帯構成に基づく条件判定
    switch (category) {
      case "women":
        return !!answers.members.some((m) => m.gender === "female")
      case "infant":
        return !!answers.members.some((m) => m.role === "child" && m.age < 3)
      case "child":
        return !!answers.members.some((m) => m.role === "child" && m.age >= 3 && m.age < 12)
      case "elderly":
        return !!answers.members.some((m) => m.age >= 65 || m.role === "grandfather" || m.role === "grandmother")
      case "pet":
        return !!answers.members.some((m) => m.role === "pet")
      default:
        return false
    }
  }

  // カテゴリーごとにアイテムをグループ化
  const categorizedItems = allItems.reduce<Record<SupplyCategory | "personal", EmergencyItem[]>>(
    (acc, item) => {
      if (shouldShowCategory(item.category)) {
        if (!acc[item.category]) {
          acc[item.category] = []
        }
        acc[item.category].push(item)
      }
      return acc
    },
    {} as Record<SupplyCategory | "personal", EmergencyItem[]>,
  )

  // 表示順序を定義
  const categoryOrder: (SupplyCategory | "personal")[] = [
    "personal",
    "food_water",
    "daily_safety",
    "hygiene",
    "women",
    "infant",
    "child",
    "elderly",
    "pet",
  ]

  // 優先度別の色分け
  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 border-green-400"
    }
  }

  const getPriorityLabel = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "必須"
      case "medium":
        return "推奨"
      case "low":
        return "あると良い"
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-slate-800">外に避難するときはこれ</h2>
        <div className="text-2xl font-bold text-slate-800 border-b-2 border-yellow-400 pb-2 mb-4">
          非常用持ち出しリスト
        </div>
      </div>

      <div className="mb-4">
        <p className="text-slate-600">
          災害に強い家に住んでいても、安全が確認できるまでは一時的に家の外に避難する必要があります。いざというときにすぐに持ち出せるように事前に準備をしておきましょう。
        </p>
      </div>

      <div className="space-y-4">
        {categoryOrder.map((category) => {
          const items = categorizedItems[category]
          if (!items || items.length === 0) return null

          return (
            <div key={category} className="border rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {(() => {
                    const IconComponent = categoryIcons[category]
                    return <IconComponent className="h-6 w-6 text-slate-600" />
                  })()}
                </div>
                <h3 className="text-md font-medium text-slate-800">{categoryNames[category]}</h3>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                  {items.map((item, index) => (
                    <div
                      key={`${category}-${index}`}
                      className="flex items-center justify-between p-3 border rounded-md bg-white hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-grow min-w-0">
                        <p className="text-base md:text-lg font-medium text-slate-800 truncate">{item.name}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs px-2 py-0.5 ${getPriorityColor(item.priority)} whitespace-nowrap ml-2`}
                      >
                        {getPriorityLabel(item.priority)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ボタンセクション */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-base border-slate-300 hover:bg-slate-100 bg-transparent"
          onClick={() => {
            // 持ち出し品リストをテキスト形式に変換
            const listText = categoryOrder.reduce((text, category) => {
              const items = categorizedItems[category]
              if (!items || items.length === 0) return text

              text += `\n【${categoryNames[category]}】\n`
              items.forEach((item) => {
                text += `・${item.name} (${getPriorityLabel(item.priority)})\n`
              })
              return text
            }, `非常用持ち出しリスト\n`)

            // クリップボードにコピー
            navigator.clipboard
              .writeText(listText)
              .then(() => {
                alert("持ち出し品リストをクリップボードにコピーしました")
              })
              .catch((err) => {
                console.error("コピーに失敗しました:", err)
                alert("コピーに失敗しました")
              })
          }}
        >
          <Copy className="h-5 w-5" />
          リストをコピー
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 text-base border-slate-300 hover:bg-slate-100 bg-transparent"
          onClick={() => {
            // 持ち出し品リストをテキスト形式に変換
            const listText = categoryOrder.reduce((text, category) => {
              const items = categorizedItems[category]
              if (!items || items.length === 0) return text

              text += `%0D%0A【${categoryNames[category]}】%0D%0A`
              items.forEach((item) => {
                text += `・${item.name} (${getPriorityLabel(item.priority)})%0D%0A`
              })
              return text
            }, `非常用持ち出しリスト%0D%0A`)

            // メールで送信
            const mailtoLink = `mailto:?subject=非常用持ち出しリスト&body=${listText}`
            window.location.href = mailtoLink
          }}
        >
          <Mail className="h-5 w-5" />
          メールで送る
        </Button>
      </div>
    </div>
  )
}
