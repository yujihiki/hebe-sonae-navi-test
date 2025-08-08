import { NextResponse } from "next/server"
import type { Answers } from "@/lib/types"
import { generateRecommendation } from "@/lib/recommendation-engine"

export async function POST(request: Request) {
  try {
    const answers: Answers = await request.json()

    // 実際のロジックでレコメンデーションを生成
    const recommendation = await generateRecommendation(answers)

    return NextResponse.json(recommendation)
  } catch (error) {
    console.error("Error processing recommendation:", error)
    return NextResponse.json({ error: "推奨事項の処理中にエラーが発生しました" }, { status: 500 })
  }
}
