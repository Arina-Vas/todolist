import Grid from "@mui/material/Grid2"
import { Container } from "@mui/material"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { useCreateTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"
import { AddItemForm } from "@/common/Components"

export const Main = () => {
  const [createTodolist] = useCreateTodolistMutation()

  return (
    <Container fixed>
      <Grid sx={{ ml: "30px" }}>
        <AddItemForm addItem={createTodolist} />
      </Grid>
      <Grid container spacing={2}>
        <Todolists />
      </Grid>
    </Container>
  )
}
