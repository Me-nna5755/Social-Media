
    import { z } from "zod";
import { signupSchema } from "../auth.validation";

    export type signupDto = z.infer<typeof signupSchema.body>