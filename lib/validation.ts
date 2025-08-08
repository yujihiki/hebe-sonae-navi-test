import { z } from "zod"

export const validateAnswers = (data: unknown) => {
  const schema = z.object({
    members: z
      .array(
        z.object({
          role: z.string(),
          gender: z.string(),
          age: z.number().min(0).max(120),
        }),
      )
      .min(1),
    specialNeeds: z.record(z.boolean()).optional(),
    rollingStock: z.boolean(),
    hasCar: z.boolean(),
    powerBackup: z.array(z.string()),
    disasterConcerns: z.record(z.boolean()).optional(),
  })

  return schema.parse(data)
}

export const validateStep = (step: number, data: unknown) => {
  switch (step) {
    case 1:
      return z
        .object({
          members: z
            .array(
              z.object({
                role: z.string(),
                gender: z.string(),
                age: z.number(),
              }),
            )
            .min(1),
        })
        .parse(data)

    case 2:
      return z
        .object({
          specialNeeds: z.record(z.boolean()).optional(),
        })
        .parse(data)

    case 3:
      return z
        .object({
          rollingStock: z.boolean(),
        })
        .parse(data)

    case 4:
      return z
        .object({
          hasCar: z.boolean(),
        })
        .parse(data)

    case 5:
      return z
        .object({
          powerBackup: z.array(z.string()),
        })
        .parse(data)

    case 6:
      return z
        .object({
          disasterConcerns: z.record(z.boolean()).optional(),
        })
        .parse(data)

    default:
      throw new Error("Invalid step")
  }
}
