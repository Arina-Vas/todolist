import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { todolistApi } from "@/features/todolists/api/todolistsApi.ts"

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as null | string,
    isLoggedIn: false

  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action) => {
      if (todolistApi.endpoints.getTodolists.matchPending(action) ||
        tasksApi.endpoints.getTasks.matchPending(action)) {
        return
      }
      state.status = "loading"
    })
    builder.addMatcher(isFulfilled, (state) => {
      state.status = "succeeded"
    })
    builder.addMatcher(isRejected, (state) => {
      state.status = "failed"
    })
  },
  reducers: (create) => {
    return {
      changeThemeModeAC: create.reducer<{ theme: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.theme
      }),
      changeAppErrorAC: create.reducer<{ error: null | string }>((state, action) => {
        state.error = action.payload.error
      }),
      setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
    }
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectThemeMode: (state): ThemeMode => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error
  }
})

export const { changeThemeModeAC, changeAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const {
  selectThemeMode,
  selectStatus, selectError, selectIsLoggedIn
} = appSlice.selectors

export type ThemeMode = "dark" | "light"