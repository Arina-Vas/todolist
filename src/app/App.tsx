import "./App.module.css"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import styles from "./App.module.css"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectThemeMode, setIsLoggedInAC } from "@/app/app-slice.ts"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/Components"
import { Routing } from "@/common/routing"
import { ErrorSnackbar } from "@/common/Components"
import { ResultCode } from "@/common/enums"
import { useMeQuery } from "@/features/auth/api/authApi.ts"
import { AUTH_TOKEN } from "@/common/constants"

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const hasToken = !!localStorage.getItem(AUTH_TOKEN)
  // @ts-ignore
  const { data, isLoading } = useMeQuery(undefined, {
    skip: !hasToken
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoading) return
    setIsInitialized(true)
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
  }, [isLoading])



  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        {!isInitialized ?
          <div className={styles.circularProgressContainer}>
            <CircularProgress size={150} thickness={3} color={"primary"} />
          </div>
          :
          <Routing />
        }
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}

export default App
