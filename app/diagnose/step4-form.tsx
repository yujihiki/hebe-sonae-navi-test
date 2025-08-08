"use client"

import { useFormContext } from "react-hook-form"
import type { Answers } from "@/lib/types"

export function Step4Form() {
  const { watch, setValue } = useFormContext<Answers>()
  const watchedHasCar = watch("hasCar")

  const handleOptionChange = (value: boolean) => {
    setValue("hasCar", value, { shouldValidate: true, shouldDirty: true })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <label
          className={`cursor-pointer rounded-lg border p-4 text-center ${
            watchedHasCar === true
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="hasCar"
            checked={watchedHasCar === true}
            onChange={() => handleOptionChange(true)}
            className="sr-only"
          />
          <div className="font-bold text-lg mb-2">はい、保有しています</div>
          <div className="text-sm text-gray-600">
            災害時には避難や
            <br />
            物資の運搬に
            <br />
            使用できます。
            <br />
            車中泊の可能性も
            <br />
            考慮したプランを
            <br />
            ご提案します。
          </div>
        </label>

        <label
          className={`cursor-pointer rounded-lg border p-4 text-center ${
            watchedHasCar === false
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="hasCar"
            checked={watchedHasCar === false}
            onChange={() => handleOptionChange(false)}
            className="sr-only"
          />
          <div className="font-bold text-lg mb-2">いいえ、保有していません</div>
          <div className="text-sm text-gray-600">
            公共交通機関や徒歩での
            <br />
            避難を前提とした
            <br />
            プランをご提案します。
          </div>
        </label>
      </div>
    </div>
  )
}
