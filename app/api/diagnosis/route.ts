import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { Answers, Recommendation, HouseholdMember } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const payload = await request.json() as {
      hnMemberId?: string
      relationship?: string
      answers: Answers
      recommendation: Recommendation
      emergencyBagResult?: any[]
    }

    const { answers, recommendation, emergencyBagResult } = payload

    // ペット数を集計
    const petDogCount = answers.members.filter((m: HouseholdMember) => m.role === "pet" && m.gender === "dog").length
    const petCatCount = answers.members.filter((m: HouseholdMember) => m.role === "pet" && m.gender === "cat").length
    const petOtherCount = answers.members.filter((m: HouseholdMember) => m.role === "pet" && !["dog", "cat"].includes(m.gender)).length

    await prisma.diagnosisResult.create({
      data: {
        hnMemberId: payload.hnMemberId ?? "",
        relationship: null,
        // 家族世帯情報
        familyInfo: {
          family: answers.members.map((m: HouseholdMember) => ({
            relation: (() => {
              switch (m.role) {
                case "self":
                  return "本人"
                case "partner":
                  return "配偶者等"
                case "father":
                  return "父"
                case "mother":
                  return "母"
                case "grandfather":
                  return "祖父"
                case "grandmother":
                  return "祖母"
                case "child":
                  return "子ども"
                case "grandchild":
                  return "孫"
                default:
                  return "その他"
              }
            })(),
            age: m.age,
            gender: (() => {
              switch (m.gender) {
                case "male":
                  return "男性"
                case "female":
                  return "女性"
                default:
                  return "その他"
              }
            })(),
          })),
        },
        // ペット情報
        petDogCount,
        petCatCount,
        petOtherCount,
        // パーソナル情報
        allergy: answers.specialNeeds.allergy ?? false,
        care: answers.specialNeeds.care ?? false,
        illness: answers.specialNeeds.illness ?? false,
        disability: answers.specialNeeds.disability ?? false,
        heatSensitive: answers.specialNeeds.heatSensitive ?? false,
        coldSensitive: answers.specialNeeds.coldSensitive ?? false,
        sweetTooth: answers.specialNeeds.sweetTooth ?? false,
        pickyEater: answers.specialNeeds.pickyEater ?? false,
        germSensitive: answers.specialNeeds.germSensitive ?? false,
        dislikeInsects: answers.specialNeeds.dislikeInsects ?? false,
        // ライフライン／保有情報
        rollingStock: answers.rollingStock,
        hasCar: answers.hasCar,
        solarPower: answers.powerBackup.includes("solar"),
        homeBattery: answers.powerBackup.includes("battery"),
        portablePower: answers.powerBackup.includes("portable"),
        otherPower: answers.powerBackup.includes("generator"),
        // 防災課題
        storageLocationConcern: answers.disasterConcerns.noSpace ?? false,
        furnitureSecuringConcern: answers.disasterConcerns.furnitureNotSecured ?? false,
        firePreventionConcern: answers.disasterConcerns.firePreventionInsufficient ?? false,
        safetyConfirmationConcern: answers.disasterConcerns.noSafetyConfirmation ?? false,
        typhoonPreparationConcern: answers.disasterConcerns.typhoonPrepUnknown ?? false,
        postDisasterActionConcern: answers.disasterConcerns.postDisasterActionUnknown ?? false,
        insuranceConcern: answers.disasterConcerns.insuranceNotReviewed ?? false,
        petEvacuationConcern: answers.disasterConcerns.petEvacuationWorry ?? false,
            // 診断結果
        adviceResult: { advice: recommendation.advice },
        suppliesResult: { supplies: recommendation.supplies },
        emergencyBagResult: { emergencyItems: recommendation.emergencyItems },
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Error saving diagnosis result:", error)
    return NextResponse.json(
      { error: "診断結果の保存に失敗しました" },
      { status: 500 }
    )
  }
}
