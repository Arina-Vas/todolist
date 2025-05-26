import { Todolists } from "@/features/todolists/api/todolistsApi.types.ts"
import { RequestStatus } from "@/app/app-slice.ts"

export type FilterType = "all" | "active" | "completed"
export type TodoListType = Todolists & {
  filter: FilterType
  entityStatus: RequestStatus
}