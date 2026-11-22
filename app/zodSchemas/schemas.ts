import * as z from "zod"

export const clientRegister = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})
export const clientLogin = z.object({
  email: z.string(),
  password: z.string(),
})
