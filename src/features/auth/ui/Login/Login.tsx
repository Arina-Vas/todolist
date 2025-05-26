import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn, selectThemeMode, setIsLoggedInAC } from "@/app/app-slice.ts"
import { getTheme } from "@/common/theme"
import { Inputs, loginSchema } from "@/features/auth/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Path } from "@/common/routing/Routing.tsx"
import { useLoginMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants"
import { useGetCaptchaUrlQuery } from "@/features/auth/api/securityApi.ts"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [login] = useLoginMutation()
  const [captcha, setCaptcha] = useState<string | undefined>(undefined)
  const { data: captchaUrl,refetch } = useGetCaptchaUrlQuery()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
      } else if (res.data?.resultCode === ResultCode.CaptchaError) {
        setCaptcha(captchaUrl?.url)
        refetch()
      }
      reset()
    })
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main)
    }
  }, [isLoggedIn])

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField type="password" label="Password" margin="normal" {...register("password")} />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            {captcha && <>
              <img alt={"captcha"} src={captchaUrl?.url}  />
              <TextField label="Captcha" margin="normal" {...register("captcha")} />
            </>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} />}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
