import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { handleError } from "@/common/utils/handleError.ts"
import { baseQueryWithZodValidation } from "@/common/utils"

export const baseApi = createApi({
  reducerPath: "todolistApi",
  tagTypes: ["Todolist", "Task","Me"],
    baseQuery: baseQueryWithZodValidation(
      async (args, api, extraOptions) => {
      const result = await fetchBaseQuery({
        credentials: 'include',
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
          headers.set('API-KEY', import.meta.env.VITE_API_KEY)

        },
      })(args, api, extraOptions)
      handleError(api,result)
      return result
    }),
  endpoints: () => ({}),



})