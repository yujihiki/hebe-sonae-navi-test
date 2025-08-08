import type { Answers, Recommendation, Supply } from "./types"

// 基本的な備蓄品データベース
const SUPPLY_DATABASE: Supply[] = [
  {
    name: "飲料水",
    qty: 3, // 1人1日3L
    unit: "L",
    category: "food_water",
    isConsumable: true,
  },
  {
    name: "食事",
    qty: 6, // 1人1日2食×3日
    unit: "食",
    category: "food_water",
    isConsumable: true,
  },
  {
    name: "懐中電灯",
    qty: 1,
    unit: "個",
    category: "daily_safety",
    isConsumable: false,
  },
  // ... 他の備蓄品
]

export async function generateRecommendation(answers: Answers): Promise<Recommendation> {
  // 1. 家族構成を分析
  const familyAnalysis = analyzeFamilyComposition(answers.members)

  // 2. 特別なニーズを分析
  const specialNeeds = analyzeSpecialNeeds(answers.specialNeeds)

  // 3. 備蓄品リストを生成
  const supplies = generateSuppliesList(familyAnalysis, specialNeeds, answers)

  // 4. アドバイスを生成
  const advice = generateAdvice(answers)

  // 5. プランを生成
  const plan = generatePlan(familyAnalysis)

  return {
    supplies,
    advice,
    plan,
  }
}

function analyzeFamilyComposition(members: Answers["members"]) {
  return {
    totalMembers: members.filter((m) => m.role !== "pet").length,
    children: members.filter((m) => m.role === "child").length,
    infants: members.filter((m) => m.role === "child" && m.age < 3).length,
    elderly: members.filter((m) => m.age >= 65).length,
    pets: members.filter((m) => m.role === "pet").length,
    women: members.filter((m) => m.gender === "female").length,
  }
}

function analyzeSpecialNeeds(specialNeeds: Answers["specialNeeds"]) {
  return {
    hasAllergy: specialNeeds.allergy || false,
    needsCare: specialNeeds.care || false,
    hasIllness: specialNeeds.illness || false,
    hasDisability: specialNeeds.disability || false,
    isHeatSensitive: specialNeeds.heatSensitive || false,
    isColdSensitive: specialNeeds.coldSensitive || false,
    isGermSensitive: specialNeeds.germSensitive || false,
  }
}

function generateSuppliesList(
  familyAnalysis: ReturnType<typeof analyzeFamilyComposition>,
  specialNeeds: ReturnType<typeof analyzeSpecialNeeds>,
  answers: Answers,
): Supply[] {
  const supplies: Supply[] = []

  // 基本的な備蓄品を追加
  SUPPLY_DATABASE.forEach((baseSupply) => {
    const supply = { ...baseSupply }

    // 消耗品の場合は人数に応じて調整
    if (supply.isConsumable && supply.category !== "pet") {
      if (typeof supply.qty === "number") {
        supply.qty = supply.qty * familyAnalysis.totalMembers
      }
    }

    supplies.push(supply)
  })

  // 特別なニーズに基づく追加アイテム
  if (specialNeeds.hasAllergy) {
    supplies.push({
      name: "アレルギー対応食品",
      qty: 3,
      unit: "食",
      category: "food_water",
      isConsumable: true,
    })
  }

  if (familyAnalysis.women > 0) {
    supplies.push({
      name: "生理用品",
      qty: 1,
      unit: "セット",
      category: "women",
      isConsumable: true,
    })
  }

  if (familyAnalysis.infants > 0) {
    supplies.push(
      {
        name: "粉ミルク",
        qty: 1,
        unit: "缶",
        category: "infant",
        isConsumable: true,
      },
      {
        name: "おむつ",
        qty: 30 * familyAnalysis.infants,
        unit: "枚",
        category: "infant",
        isConsumable: true,
      },
    )
  }

  if (familyAnalysis.pets > 0) {
    supplies.push({
      name: "ペットフード",
      qty: 7 * familyAnalysis.pets,
      unit: "日分",
      category: "pet",
      isConsumable: true,
    })
  }

  return supplies
}

function generateAdvice(answers: Answers): string[] {
  const advice: string[] = []

  // 基本的なアドバイス
  advice.push(
    "# 水の備蓄について\n\n一人あたり1日3Lを目安に、最低3日分の水を備蓄しましょう。",
    "# 食料の備蓄について\n\n非常食は、調理不要で賞味期限が長いものを選びましょう。",
  )

  // 特別なニーズに基づくアドバイス
  if (answers.specialNeeds.allergy) {
    advice.push("# アレルギー対策\n\nアレルギー対応の非常食を備蓄し、エピペンなどの医薬品も用意しておきましょう。")
  }

  if (answers.members.some((m) => m.role === "pet")) {
    advice.push("# ペットの防災対策\n\nペットフードや水、トイレ用品なども備蓄しておきましょう。")
  }

  if (!answers.rollingStock) {
    advice.push(
      "# ローリングストックの導入\n\n普段から少し多めに食料を買い、古いものから使用して補充する方法をおすすめします。",
    )
  }

  return advice
}

function generatePlan(familyAnalysis: ReturnType<typeof analyzeFamilyComposition>) {
  if (familyAnalysis.children > 0 && familyAnalysis.pets > 0) {
    return {
      title: "ファミリー＆ペット安心プラン",
      description: "お子様とペットがいるご家庭向けの総合防災プランです。",
      cta: "/family-pet-plan.pdf",
    }
  } else if (familyAnalysis.children > 0) {
    return {
      title: "ファミリー安心プラン",
      description: "お子様がいるご家庭向けの防災プランです。",
      cta: "/family-plan.pdf",
    }
  } else if (familyAnalysis.elderly > 0) {
    return {
      title: "シニア安心プラン",
      description: "高齢者がいるご家庭向けの防災プランです。",
      cta: "/senior-plan.pdf",
    }
  } else {
    return {
      title: "基本防災プラン",
      description: "基本的な防災対策をまとめたプランです。",
      cta: "/basic-plan.pdf",
    }
  }
}
