import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().nonempty({message: 'Email is required' }).email({ message: 'Incorrect email address' }),
  password: z.string().nonempty({message: 'Password is required' }).min(3, {message: 'Password must be at least 3 characters long'}),
  rememberMe: z.boolean(),
  captcha: z.string().optional(),
})


export type Inputs = z.infer<typeof loginSchema>