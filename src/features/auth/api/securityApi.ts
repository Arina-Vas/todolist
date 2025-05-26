import { baseApi } from "@/app/baseApi.ts"

export const securityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCaptchaUrl: build.query<{ url: string },void>({
      query: () => ({
        url: "/security/get-captcha-url"
      })
    })
  })
})

export const {useGetCaptchaUrlQuery} = securityApi