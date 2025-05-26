import {AddItemForm} from "@/common/Components";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import { TodoListType } from "@/features/todolists/lib"

export type FilterType = 'all' | 'active' | 'completed'

type Props = {
    todolist: TodoListType
}

export const TodolistItem = ({todolist}: Props) => {
    const {id} = todolist
    const [createTask] = useCreateTaskMutation()

    const addTask = (title: string) => {
      createTask({todolistId: id, title})
    }
    return (
        <div className={'todoList'}>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
};

