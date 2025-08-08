import { z } from "zod"

export const householdMemberSchema = z.object({
  role: z.enum([
    "self",
    "partner",
    "child",
    "father",
    "mother",
    "grandchild",
    "grandfather",
    "grandmother",
    "pet",
    "other",
    "family",
  ]),
  gender: z.enum(["male", "female", "other", "dog", "cat"]),
  age: z.number().min(0).max(120),
})

export const specialNeedsSchema = z.object({
  allergy: z.boolean().optional(),
  care: z.boolean().optional(),
  illness: z.boolean().optional(),
  disability: z.boolean().optional(),
  heatSensitive: z.boolean().optional(),
  coldSensitive: z.boolean().optional(),
  sweetTooth: z.boolean().optional(),
  pickyEater: z.boolean().optional(),
  germSensitive: z.boolean().optional(),
  dislikeInsects: z.boolean().optional(),
})

export const disasterConcernsSchema = z.object({
  unknownGoods: z.boolean().optional(),
  noSpace: z.boolean().optional(),
  managementTrouble: z.boolean().optional(),
  furnitureNotSecured: z.boolean().optional(),
  earthquakeResistanceWorry: z.boolean().optional(),
  floodWorry: z.boolean().optional(),
  firePreventionInsufficient: z.boolean().optional(),
  powerOutageWorry: z.boolean().optional(),
  evacuationRouteUnknown: z.boolean().optional(),
  noSafetyConfirmation: z.boolean().optional(),
  disasterInfoUnknown: z.boolean().optional(),
  typhoonPrepUnknown: z.boolean().optional(),
  postDisasterActionUnknown: z.boolean().optional(),
  trainingDifficult: z.boolean().optional(),
  insuranceNotReviewed: z.boolean().optional(),
  petEvacuationWorry: z.boolean().optional(),
})

export const answersSchema = z.object({
  members: z.array(householdMemberSchema).min(1),
  specialNeeds: specialNeedsSchema,
  rollingStock: z.boolean(),
  hasCar: z.boolean(),
  powerBackup: zsasterConcerns: disasterConcernsSchema,

export type HouseholdMember = z.infer<typeof householdMemberSchema>
export type SpecialNeeds = z.infer<typeof specialNeedsSchema>
export type DisasterConcerns = z.infer<typeof disasterConcernsSchema>
export type Answers = z.infer<typeof answersSchema>

// SupplyCategory の定義
export type SupplyCategory =
// SupplyCat gory の定義
e | "food_water"
  | "hygiene"
  | "daily_safety"
  | "women"
  | "infant"
  | "child"
  | "elderly"
  | "pet"


//診診断結果データ型export interface SupplyItem {
  name: string
  qty: number
  unit: string
  category: SupplyCategory
  img?: string
  ecUrl?: string
  isConsumable: boolean
}

export interface RecommendationPlan {
  title: string
  title: string
  content: string
}


// アドバイスアイテム型export interface Recommendation {
  supplies: SupplyItem[]
  advice: AdviceItem[]
  plan: RecommendationPlan
}

}