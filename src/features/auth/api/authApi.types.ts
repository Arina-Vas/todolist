import { z } from "zod"
import { loginSchema } from "@/features/auth/lib/schemas"
import { BaseResponseSchema } from "@/common/types/types.ts"

export const LoginArgsSchema = loginSchema.extend({
  captcha: z.string().optional(),
})

export type LoginArgs = z.infer<typeof LoginArgsSchema>

export const AuthSchema = z.object({
  userId: z.number(),
  token: z.string(),
})
export const AuthResponseSchema = BaseResponseSchema(AuthSchema)
export type AuthResponse = z.infer<typeof AuthResponseSchema>

export const MeSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  login: z.string(),
})

export const MeResponseSchema = BaseResponseSchema(MeSchema)
export type MeResponse = z.infer<typeof MeResponseSchema>
