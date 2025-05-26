import { EditableSpan } from "@/common/Components"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import {
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation
} from "@/features/todolists/api/todolistsApi.ts"
import { TodoListType } from "@/features/todolists/lib"

type Props = {
  todolist: TodoListType
};
export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()


  const deleteTodoListHandler = () => {
    deleteTodolist(id)
  }

  const changeTodoListTitleHandler = (title: string) => {
    changeTodolistTitle({ title, id })
  }

  const isDisabled = entityStatus === "loading"

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan updateTitle={changeTodoListTitleHandler} oldTitle={title} disabled={isDisabled} />
      </h3>
      <IconButton onClick={deleteTodoListHandler} size={"small"} disabled={isDisabled}>
        <DeleteIcon />
      </IconButton>
    </div>

  )
}