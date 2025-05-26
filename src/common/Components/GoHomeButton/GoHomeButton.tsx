import { Link } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import Button from "@mui/material/Button"
import { useAppSelector } from "@/common/hooks"
import { selectThemeMode } from "@/app/app-slice.ts"
import { getTheme } from "@/common/theme"

export const GoHomeButton = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  return (
    <Button
      component={Link}
      to={Path.Main}
      variant="text"
      disableTouchRipple={false}
      sx={{
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.light,
        margin: "20px auto",
        width: "300px",
      }}
    >
      Go to Homepage
    </Button>
  )
}