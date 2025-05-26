import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.tsx"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/common/hooks"
import { changeAppErrorAC } from "@/app/app-slice.ts"
import { TodoListType } from "@/features/todolists/lib"
import {
  TasksPagination
} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx"
import { PAGE_SIZE } from "@/common/constants"

type Props = {
  todolist: TodoListType
}
export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGetTasksQuery({
    todolistId: id,
    params: {
      page
    }
  }, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const tasks = data?.items
  const filterFoo = (): DomainTask[] => {
    if (!tasks) return []
    switch (filter) {
      case "completed":
        return tasks.filter((task: DomainTask) => task.status === TaskStatus.Completed)
      case "active":
        return tasks.filter((task: DomainTask) => task.status === TaskStatus.New)
      default:
        return tasks
    }
  }
const totalCount = data?.totalCount || 0

  useEffect(() => {
    if (!error) return
    if ("status" in error) {
      const errorMsg = "error" in error ? error.error : JSON.stringify(error.data)
      dispatch(changeAppErrorAC({ error: errorMsg }))
    } else {
      dispatch(changeAppErrorAC({ error: error.message || "Some error occurred" }))
    }
  }, [error])

  const mappedTask = filterFoo()?.map((task: DomainTask) => {
    console.log(task.title)
    return <TaskItem key={task.id} task={task} todolist={todolist} />
  })
  if (isLoading) {
    return <TasksSkeleton />
  }
  return <>{tasks?.length === 0 ? <p>Тасок нет</p> : <List>{mappedTask}</List>}
    {totalCount > PAGE_SIZE && <TasksPagination totalCount={totalCount} page={page} setPage={setPage} />}
  </>
}
