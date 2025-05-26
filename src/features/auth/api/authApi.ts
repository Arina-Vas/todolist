import { AuthResponse, LoginArgs, MeResponse } from "@/features/auth/api/authApi.types.ts"
import { DefaultResponse } from "@/common/types/types.ts"
import { baseApi } from "@/app/baseApi.ts"


export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<MeResponse,void>({
      query: () => "/auth/me",
      providesTags: ["Task"]
    }),
    login: build.mutation<AuthResponse, LoginArgs>({
      query: (args) => ({
        url: "/auth/login",
        method: "POST",
        body: args
      }),
      invalidatesTags: ["Task"]
    }),
    logout: build.mutation<DefaultResponse,void>({
      query: () => ({
        url: "/auth/login",
        method: "DELETE",
      })
    }),
  })
})

export const {useLogoutMutation, useLoginMutation, useMeQuery} = authApi



