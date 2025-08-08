"use client"

import { useFormContext } from "react-hook-form"
import type { Answers } from "@/lib/types"

export function Step2Form() {
  const { watch, setValue, getValues } = useFormContext<Answers>()
  const watchedNeeds = watch("specialNeeds") || {}

  const needsOptions = [
    { key: "allergy", label: "食物\nアレルギーがある" },
    { key: "care", label: "介護が必要" },
    { key: "illness", label: "疾患がある" },
    { key: "disability", label: "障がいがある" },
    { key: "heatSensitive", label: "暑さが苦手" },
    { key: "coldSensitive", label: "寒さが苦手" },
    { key: "sweetTooth", label: "甘いものを\nよく食べる" },
    { key: "pickyEater", label: "食べられない\n食材が多い" },
    { key: "germSensitive", label: "潔癖症" },
    { key: "dislikeInsects", label: "虫が苦手" },
  ]

  const handleCheckboxChange = (optionKey: keyof Answers["specialNeeds"]) => {
    const currentNeeds = getValues("specialNeeds") || {}
    const newNeeds = {
      ...currentNeeds,
      [optionKey]: !currentNeeds[optionKey],
    }
    setValue("specialNeeds", newNeeds, { shouldValidate: false, shouldDirty: true })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {needsOptions.map((option) => (
          <label
            key={option.key}
            className={`cursor-pointer rounded-lg border p-4 text-center h-24 flex items-center justify-center whitespace-pre-line ${
              watchedNeeds[option.key as keyof Answers["specialNeeds"]]
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={watchedNeeds[option.key as keyof Answers["specialNeeds"]] || false}
              onChange={() => handleCheckboxChange(option.key as keyof Answers["specialNeeds"])}
              className="sr-only"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
