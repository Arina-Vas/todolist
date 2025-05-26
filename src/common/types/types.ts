import { z, ZodTypeAny } from "zod"
import { ResultCode } from "@/common/enums"

export const FieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

export const BaseResponseSchema = <T extends ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    resultCode: z.nativeEnum(ResultCode),
    messages: z.array(z.string()),
    fieldsErrors: z.array(FieldErrorSchema),
  })

export const DefaultResponseSchema = BaseResponseSchema(z.object({}))
export type DefaultResponse = z.infer<typeof DefaultResponseSchema>

