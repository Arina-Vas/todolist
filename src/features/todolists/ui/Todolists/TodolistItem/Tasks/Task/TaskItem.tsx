import { ChangeEvent } from "react"
import { EditableSpan } from "@/common/Components"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Task/TaskItem.styles.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import { TodoListType } from "@/features/todolists/lib"

type Props = {
  todolist: TodoListType
  task: DomainTask
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()


  const removeTask = () => {
    deleteTask({ todolistId: todolist.id, taskId: task.id })
  }

  const updateTaskHandler = (el: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof el === "string") {
      updateTask({todolistId: task.todoListId,taskId: task.id,model: { ...task, title: el }})
    } else {
      updateTask({todolistId: task.todoListId,taskId: task.id,model:{ ...task, status: el.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New }})
    }
  }

  const newStatusValue = task.status === TaskStatus.Completed
  const className = newStatusValue ? "isDone" : ""
  const disabled = todolist.entityStatus === "loading"

  return (
    <ListItem className={`task ${className}`} sx={getListItemSx(newStatusValue)}>
      <div>
        <Checkbox id={task.id} onChange={updateTaskHandler} checked={newStatusValue} disabled={disabled} />
        <EditableSpan updateTitle={updateTaskHandler} oldTitle={task.title} disabled={disabled} />
      </div>
      <IconButton onClick={removeTask} size={"small"} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
