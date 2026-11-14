    import { z } from "zod";

    export const signupSchema = {
        body: z.object({
            userName: z.string().min(2).max(100),
            firstName: z.string()
                .min(2, { error: "First name must be at least 2 characters" })
                .max(100),
            lastName: z.string().min(2).max(100),
            email: z.email(),
            phone: z.string().regex(/^[0-9]{10}$/),
            password: z.string().min(6).max(100),
            confirmEmail: z.string()
    .optional()
    .transform((value) => value === "true"),
            confrimPassword: z.string().min(6).max(100)
        }).superRefine((data, ctx) => {
            if (data.password !== data.confrimPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: "Passwords do not match",
                    path: ["confrimPassword"]
                });
            }
        }),
        params: z.object({
            id: z.string().uuid()
        })
    };
        //let validate= signupSchema.safeParse() //object