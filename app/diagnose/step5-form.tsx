"use client"

import { useFormContext } from "react-hook-form"
import type { Answers } from "@/lib/types"

export function Step5Form() {
  const { register, watch, setValue } = useFormContext<Answers>()
  const powerOptions = [
    { key: "solar", label: "太陽光発電機" },
    { key: "battery", label: "住宅用蓄電池" },
    { key: "portable", label: "ポータブル電源" },
    { key: "generator", label: "EV車／発電機" },
    { key: "none", label: "特に備えなし" },
  ] as const

  type PowerKey = typeof powerOptions[number]["key"]

  const watchedPowerBackup = (watch("powerBackup") || []) as PowerKey[]

  const handleCheckboxChange = (optionKey: PowerKey) => {
    const currentValues = watchedPowerBackup.filter((v) => v !== "none")
    let newValues: PowerKey[]

    if (optionKey === "none") {
      newValues = ["none"]
    } else {
      if (currentValues.includes(optionKey)) {
        newValues = currentValues.filter((v) => v !== optionKey)
      } else {
        newValues = [...currentValues, optionKey]
      }
    }

    if (newValues.length === 0) {
      newValues = ["none"]
    }

    setValue("powerBackup", newValues, { shouldValidate: true })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {powerOptions.map((option) => (
          <label
            key={option.key}
            className={`cursor-pointer rounded-lg border p-4 text-center h-24 flex items-center justify-center ${
              watchedPowerBackup?.includes(option.key)
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            } ${option.key === "none" ? "col-span-2" : ""}`}
          >
            <input
              type="checkbox"
              value={option.key}
              checked={watchedPowerBackup?.includes(option.key) || false}
              onChange={() => handleCheckboxChange(option.key)}
              className="sr-only"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
