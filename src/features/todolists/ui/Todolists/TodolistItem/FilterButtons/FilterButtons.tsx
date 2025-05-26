import {Box} from "@mui/material";
import Button from "@mui/material/Button";

import {FilterType} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {containerSX} from "@/common/styles/container.styles.ts";
import { todolistApi } from "@/features/todolists/api/todolistsApi.ts"
import { TodoListType } from "@/features/todolists/lib"

type Props = {
    todolist: TodoListType
};
export const FilterButtons = ({todolist}: Props) => {

    const {id, filter} = todolist
    const dispatch = useAppDispatch();

    const changeFilter = (filter: FilterType) => {
        dispatch(todolistApi.util.updateQueryData('getTodolists',undefined,(state)=>{
            const todolist = state.find(tl => tl.id === id)
            if(todolist) todolist.filter = filter
        }))
    }
    const getButtonVariant = (filterButton: FilterType) => {
        return (filterButton === filter) ? 'contained' : 'outlined'
    }

    return (
        < div className={'buttonsWrapper'}>
            <Box sx={containerSX} >
                <Button  variant={getButtonVariant('all')} onClick={() => {
                    changeFilter('all')
                }}>All</Button>
                <Button variant={getButtonVariant('active')} onClick={() => {
                    changeFilter('active')
                }}>Active</Button>
                <Button variant={getButtonVariant('completed')} onClick={() => {
                    changeFilter('completed')
                }}>Completed</Button>
            </Box>
        </div>
    );
};