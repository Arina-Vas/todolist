import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { LinearProgress } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import {
  changeThemeModeAC,
  selectIsLoggedIn,
  selectStatus,
  selectThemeMode,
  setIsLoggedInAC
} from "@/app/app-slice.ts"

import { MenuButton } from "@/common/Components"
import { CustomSwitch } from "@/common/Components"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants"
import { useLogoutMutation } from "@/features/auth/api/authApi.ts"
import { baseApi } from "@/app/baseApi.ts"
import { Path } from "@/common/routing/Routing.tsx"
import { useNavigate } from "react-router"
export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoading = status === "loading"
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [logOut] = useLogoutMutation()
  const changeModeHandler = () => {
    dispatch(
      changeThemeModeAC({
        theme: themeMode === "light" ? "dark" : "light",
      }),
    )
  }

  const onLogoutHandler = () => {
    logOut().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({isLoggedIn: false}))
        localStorage.removeItem(AUTH_TOKEN)
      }
    })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist","Task"]))
      })

  }

  const onFAQHandler = () => {
         navigate(Path.Faq)
  }

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "80px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && (
            <MenuButton color="inherit" onClick={onLogoutHandler}>
              Log out
            </MenuButton>
          )}
          <MenuButton color="inherit" onClick={onFAQHandler}>FAQ</MenuButton>
          <CustomSwitch onChange={changeModeHandler} />
        </Toolbar>
        {isLoading && <LinearProgress />}
      </AppBar>
    </Box>
  )
}
