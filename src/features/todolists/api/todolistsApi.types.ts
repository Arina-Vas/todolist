import { z } from "zod"
import { BaseResponseSchema } from "@/common/types/types.ts"

export const TodolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string().datetime({ local: true }),
  order: z.number(),
})

export type Todolists = z.infer<typeof TodolistSchema>

export const TodolistResponseSchema = BaseResponseSchema(z.object({ item: TodolistSchema }))
export type TodolistResponse = z.infer<typeof TodolistResponseSchema>
