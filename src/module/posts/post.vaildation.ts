import { z } from "zod";



export const postVaildation= z.strictObject({
    title: z.string().min(3).max(100),
    content: z.string().min(10)
})