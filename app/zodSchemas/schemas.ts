import * as z from "zod"

export const client = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})
