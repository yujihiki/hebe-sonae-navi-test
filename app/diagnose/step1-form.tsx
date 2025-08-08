"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import Image from "next/image"
import { Plus, Trash2 } from "lucide-react"
import type { Answers } from "@/lib/types"

export function Step1Form() {
  const { control, register, watch, setValue } = useFormContext<Answers>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  })

  const watchedMembers = watch("members")

  const addMember = () => {
    append({ role: "child", gender: "male", age: 10 })
  }

  const roleOptions = [
    { value: "partner", label: "配偶者・パートナー" },
    { value: "child", label: "子ども" },
    { value: "father", label: "父" },
    { value: "mother", label: "母" },
    { value: "grandfather", label: "祖父" },
    { value: "grandmother", label: "祖母" },
    { value: "grandchild", label: "孫" },
    { value: "pet", label: "ペット" },
    { value: "other", label: "その他" },
  ]

  const genderOptions = [
    { value: "male", label: "男性" },
    { value: "female", label: "女性" },
    { value: "other", label: "その他・無回答" },
  ]

  return (
    <div className="space-y-6">
      {/* あなた自身の情報 */}
      <div className="space-y-4">
        <h3 className="font-semibold">あなた自身の情報</h3>
        <div className="grid grid-cols-3 gap-2">
          {genderOptions.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg border p-4 text-center ${
                watchedMembers[0]?.gender === option.value
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                value={option.value}
                {...register("members.0.gender")}
                className="sr-only"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">年齢</label>
          <select
            {...register("members.0.age", { valueAsNumber: true })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
          >
            {Array.from({ length: 121 }, (_, i) => (
              <option key={i} value={i}>
                {i}歳
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 家族情報 */}
      <div className="space-y-4">
        <h3 className="font-semibold">家族情報</h3>
        {fields.slice(1).map((field, index) => (
          <div key={field.id} className="rounded-lg border bg-white p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">家族 {index + 1}</h4>
              <button type="button" onClick={() => remove(index + 1)} className="text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">関係性</label>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-lg border p-2 text-center text-sm ${
                      watchedMembers[index + 1]?.role === option.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register(`members.${index + 1}.role`)}
                      className="sr-only"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">性別</label>
              <div className="grid grid-cols-3 gap-2">
                {genderOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-lg border p-4 text-center ${
                      watchedMembers[index + 1]?.gender === option.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register(`members.${index + 1}.gender`)}
                      className="sr-only"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">年齢</label>
              <select
                {...register(`members.${index + 1}.age`, { valueAsNumber: true })}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
              >
                {Array.from({ length: 121 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}歳
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addMember}
          className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500"
        >
          <Plus className="w-5 h-5" />
          <span>家族情報を追加</span>
        </button>
      </div>
    </div>
  )
}
