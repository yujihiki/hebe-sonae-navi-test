"use client"

import { useFormContext } from "react-hook-form"
import type { Answers } from "@/lib/types"

export function Step6Form() {
  const { watch, setValue, getValues } = useFormContext<Answers>()
  const watchedConcerns = watch("disasterConcerns") || {}

  const concernOptions = [
    { key: "unknownGoods", label: "必要な防災グッズを準備している" },
    { key: "participatedInDrills", label: "町内会や近隣で行われている防災訓練に参加したことがある" },
    { key: "knowEvacuationRoute", label: "近くの避難場所や避難ルートを把握している" },
    { key: "securedFurniture", label: "家具・家電の転倒／落下防止措置をしている" },
    { key: "knowDisasterRisk", label: "住んでいるエリアの災害リスクが把握できている" },
    { key: "checkFireAlarms", label: "火災警報器を定期的に点検している" },
    { key: "insufficientFireMeasures", label: "火災警報器・消火器など火災対策が不十分" },
    { key: "anxiousAboutLifeline", label: "停電・断水時の生活維持が不安" },
    { key: "unknownEvacuationRoute", label: "避難場所・避難経路がわからない" },
    { key: "noSafetyConfirmationPlan", label: "家族や親戚との安否確認方法を決めていない" },
    { key: "unknownDisasterInfo", label: "災害情報の確認方法がわからない" },
    { key: "unknownTyphoonPrep", label: "台風・大雨前に行うべき対策がわからない" },
    { key: "unknownPostDisasterAction", label: "被災直後に自宅で取るべき行動がわからない" },
    { key: "difficultToParticipateDrills", label: "防災訓練・講習に参加しにくい" },
    { key: "insuranceNotReviewed", label: "地震保険・火災保険の加入や補償内容の見直しができていない" },
    { key: "anxiousAboutPetEvacuation", label: "ペットと一緒に避難できるか不安" },
  ]

  const handleCheckboxChange = (optionKey: keyof Answers["disasterConcerns"]) => {
    const currentConcerns = getValues("disasterConcerns") || {}
    const newConcerns = {
      ...currentConcerns,
      [optionKey]: !currentConcerns[optionKey],
    }
    setValue("disasterConcerns", newConcerns, { shouldValidate: false, shouldDirty: true })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {concernOptions.map((option) => (
          <label
            key={option.key}
            className={`cursor-pointer rounded-lg border p-4 text-center h-24 flex items-center justify-center whitespace-pre-line text-sm ${
              watchedConcerns[option.key as keyof Answers["disasterConcerns"]]
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={watchedConcerns[option.key as keyof Answers["disasterConcerns"]] || false}
              onChange={() => handleCheckboxChange(option.key as keyof Answers["disasterConcerns"])}
              className="sr-only"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
