"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { Answers, Supply, SupplyCategory } from "@/lib/types"
import { Toggle } from "@/components/ui/toggle"
import {
  Clock,
  Calendar,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuppliesListProps {
  supplies: Supply[]
  answers?: Answers | null
}

export function SuppliesList({ supplies, answers }: SuppliesListProps) {
  // 3日分と7日分を切り替えるための状態
  const [isWeekMode, setIsWeekMode] = useState(true)

  // カテゴリー名の日本語マッピング
  const categoryNames: Record<SupplyCategory, string> = {
    food_water: "食品・水",
    hygiene: "衛生用品",
    daily_safety: "生活・安全用品",
    women: "女性用品",
    infant: "乳幼児用品",
    child: "子ども用品",
    elderly: "高齢者用品",
    pet: "ペット用品",
  }

  // カテゴリーアイコンのマッピング
  const categoryIcons: Record<SupplyCategory, React.ComponentType<{ className?: string }>> = {
    food_water: Utensils,
    hygiene: Sparkles,
    daily_safety: Shield,
    women: Heart,
    infant: Baby,
    child: Users,
    elderly: UserCheck,
    pet: Paw,
  }

  // ペットを除いた家族の人数を計算
  const getFamilyCount = (): number => {
    if (!answers) return 1
    return answers.members.filter((member) => member.role !== "pet").length
  }

  // ペットの数を計算
  const getPetCount = (): number => {
    if (!answers) return 0
    return answers.members.filter((member) => member.role === "pet").length
  }

  // 人数に応じた数量を計算
  const calculateQuantity = (item: Supply, isWeekMode: boolean): string => {
    if (item.qty === "適量" || (typeof item.qty === "number" && item.qty === 0 && item.unit === "適量")) {
      return "適量"
    }

    const familyCount = getFamilyCount()
    const petCount = getPetCount()
    let baseQty = Number(item.qty)

    // 7日分の場合の計算
    if (isWeekMode) {
      baseQty = Math.ceil((baseQty * 7) / 3)
    }

    // 消耗品の場合は人数に比例させる
    if (item.isConsumable) {
      // ペット用品の場合はペットの数に比例
      if (item.category === "pet") {
        baseQty = Math.ceil(baseQty * petCount)
      } else {
        // その他の消耗品は人数に比例
        baseQty = Math.ceil(baseQty * familyCount)
      }
    }

    return `${baseQty} ${item.unit}`
  }

  // 世帯構成に基づいて表示すべきカテゴリーを判定
  const shouldShowCategory = (category: SupplyCategory): boolean => {
    if (!answers) return true

    // 基本カテゴリーは常に表示
    if (["food_water", "hygiene", "daily_safety"].includes(category)) {
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

  // カテゴリーごとに備蓄品をグループ化
  const categorizedSupplies = supplies.reduce<Record<SupplyCategory, Supply[]>>(
    (acc, supply) => {
      if (shouldShowCategory(supply.category)) {
        if (!acc[supply.category]) {
          acc[supply.category] = []
        }
        acc[supply.category].push(supply)
      }
      return acc
    },
    {} as Record<SupplyCategory, Supply[]>,
  )

  // 表示順序を定義
  const categoryOrder: SupplyCategory[] = [
    "food_water",
    "hygiene",
    "daily_safety",
    "women",
    "infant",
    "child",
    "elderly",
    "pet",
  ]

  const familyCount = getFamilyCount()
  const petCount = getPetCount()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-slate-800">自宅に備えておこう</h2>
        <div className="text-2xl font-bold text-slate-800 border-b-2 border-yellow-400 pb-2 mb-4">
          あなたの家庭に必要な備蓄リスト
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-slate-600 whitespace-normal">
          あなたの世帯構成に基づいて、必要な備蓄をリストアップしました。ライフラインの復旧は災害発生から1週間以上かかるケースがほとんどです。そのため、1週間分くらいの備蓄を備えておきましょう。（最低でも3日分）【内容や数量はサンプルです】
        </p>

        <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 border rounded-lg p-1 bg-slate-50 w-fit">
            <Toggle
              pressed={!isWeekMode}
              onPressedChange={() => setIsWeekMode(false)}
              size="default"
              className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 px-4 py-2 whitespace-nowrap text-base"
            >
              <Clock className="h-5 w-5 mr-2" />
              3日分
            </Toggle>
            <Toggle
              pressed={isWeekMode}
              onPressedChange={() => setIsWeekMode(true)}
              size="default"
              className="data-[state=on]:bg-green-100 data-[state=on]:text-green-700 px-4 py-2 whitespace-nowrap text-base"
            >
              <Calendar className="h-5 w-5 mr-2" />
              7日分
            </Toggle>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {categoryOrder.map((category) => {
          const items = categorizedSupplies[category]
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
                      className="flex items-center p-3 border rounded-md bg-white hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-grow min-w-0">
                        <p className="text-base md:text-lg font-medium text-slate-800 truncate">{item.name}</p>
                        {item.ecUrl && (
                          <a
                            href={item.ecUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center mt-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                            </svg>
                            購入する
                          </a>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className="ml-2 px-3 py-1.5 text-base font-bold bg-yellow-100 text-yellow-800 border-yellow-400 whitespace-nowrap"
                      >
                        {calculateQuantity(item, isWeekMode)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ボタンセクションを追加 */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-base border-slate-300 hover:bg-slate-100 bg-transparent"
          onClick={() => {
            // 備蓄リストをテキスト形式に変換
            const listText = categoryOrder.reduce(
              (text, category) => {
                const items = categorizedSupplies[category]
                if (!items || items.length === 0) return text

                text += `\n【${categoryNames[category]}】\n`
                items.forEach((item) => {
                  text += `・${item.name}: ${calculateQuantity(item, isWeekMode)}\n`
                })
                return text
              },
              `必要な備蓄リスト（${isWeekMode ? "1週間分" : "3日分"}・${familyCount}人${petCount > 0 ? `・ペット${petCount}匹` : ""}分）\n`,
            )

            // クリップボードにコピー
            navigator.clipboard
              .writeText(listText)
              .then(() => {
                alert("備蓄リストをクリップボードにコピーしました")
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
            // 備蓄リストをテキスト形式に変換
            const listText = categoryOrder.reduce(
              (text, category) => {
                const items = categorizedSupplies[category]
                if (!items || items.length === 0) return text

                text += `%0D%0A【${categoryNames[category]}】%0D%0A`
                items.forEach((item) => {
                  text += `・${item.name}: ${calculateQuantity(item, isWeekMode)}%0D%0A`
                })
                return text
              },
              `必要な備蓄リスト（${isWeekMode ? "1週間分" : "3日分"}・${familyCount}人${petCount > 0 ? `・ペット${petCount}匹` : ""}分）%0D%0A`,
            )

            // メールで送信
            const mailtoLink = `mailto:?subject=防災備蓄リスト&body=${listText}`
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
