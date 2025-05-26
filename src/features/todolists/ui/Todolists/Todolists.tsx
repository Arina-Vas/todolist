import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import Box from "@mui/material/Box"
import { containerSX } from "@/common/styles/container.styles.ts"
import { TodoListType } from "@/features/todolists/lib"

export const Todolists = () => {
  const {data: todolists,isLoading} = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSX} style={{ gap: "32px" }}>
        {Array(3).fill(null).map((_, i) => (
          <TodolistSkeleton key={i}></TodolistSkeleton>
        ))}
      </Box>)
  }
  return (
    <>
      {todolists?.map((tl: TodoListType) => {
        return (
          <Grid key={tl.id} sx={{ p: "30px" }}>
            <Paper elevation={5} sx={{ p: "20px", borderRadius: "10px" }}>
              <TodolistItem todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
