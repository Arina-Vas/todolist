import { z } from "zod"
import { TaskPriority, TaskStatus } from "@/common/enums"
import { BaseResponseSchema } from "@/common/types/types.ts"

export const DomainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string().datetime({ local: true }),
})

export type DomainTask = z.infer<typeof DomainTaskSchema>

export const GetTasksResponseSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number(),
  items: z.array(DomainTaskSchema),
})

export type GetTasksResponse = z.infer<typeof GetTasksResponseSchema>

export const UpdateTaskModel = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
})
export type UpdateTaskModel = z.infer<typeof UpdateTaskModel>

export const TaskResponseSchema = BaseResponseSchema(
  z.object({
    item: DomainTaskSchema,
  }),
)

export type TaskResponse = z.infer<typeof TaskResponseSchema>
