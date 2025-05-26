import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/Components"
import { ProtectedRoute } from "@/common/Components"
import { useAppSelector } from "@/common/hooks"
import { Faq } from "@/common/Components"
import { selectIsLoggedIn } from "@/app/app-slice.ts"

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "/*",
  Faq: "/faq",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<Faq />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
