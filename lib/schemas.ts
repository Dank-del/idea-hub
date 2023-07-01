import {z} from "zod";

export const ideaFormSchema = z.object({
  title: z.string().min(10, {
    message: "title must be at least 10 characters.",
  }),
  content: z.string().min(30, {
    message: "content must be at least 30 characters."
  })
})
