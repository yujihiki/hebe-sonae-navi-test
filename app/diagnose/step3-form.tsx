"use client"

import { useFormContext } from "react-hook-form"
import type { Answers } from "@/lib/types"

export function Step3Form() {
  const { watch, setValue } = useFormContext<Answers>()
  const watchedRollingStock = watch("rollingStock")

  const handleOptionChange = (value: boolean) => {
    setValue("rollingStock", value, { shouldValidate: true, shouldDirty: true })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <label
          className={`cursor-pointer rounded-lg border p-4 text-center ${
            watchedRollingStock === true
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="rollingStock"
            checked={watchedRollingStock === true}
            onChange={() => handleOptionChange(true)}
            className="sr-only"
          />
          <div className="font-bold text-lg mb-2">はい、実践しています</div>
          <div className="text-sm text-gray-600">
            普段から少し多めに
            <br />
            食料や日用品を買い、
            <br />
            古いものから使用して
            <br />
            補充しています。
          </div>
        </label>

        <label
          className={`cursor-pointer rounded-lg border p-4 text-center ${
            watchedRollingStock === false
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="rollingStock"
            checked={watchedRollingStock === false}
            onChange={() => handleOptionChange(false)}
            className="sr-only"
          />
          <div className="font-bold text-lg mb-2">いいえ、実践していません</div>
          <div className="text-sm text-gray-600">
            特に多めに買い置きは
            <br />
            していないか、
            <br />
            非常食として別に
            <br />
            保管しています。
          </div>
        </label>
      </div>
    </div>
  )
}
