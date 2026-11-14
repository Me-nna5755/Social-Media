
import { Request, NextFunction, Response } from "express";
import { BadRequestException, MapGraphQlError } from "../../common/exceptions/error.exeption";
import { ZodType } from "zod";
//import { GraphQLError } from "graphql";

type ValidationKey = keyof Request;
type ValidationSchema = Partial<Record<ValidationKey, ZodType>>;

// export const validation = (Schema: ValidationSchema) => {
//     return (req: Request, res: Response, next: NextFunction) => {

//         let vaildationErrors=[]

//         for (const key of Object.keys(Schema) as ValidationKey[]) {
//             if (!Schema[key]) {
//                 throw new BadRequestException("Validation error", 400);
//             }
//                 const value = Schema[key].safeParse(req[key]);
//             if(!value.success){
//                 //throw new BadRequestException("Validation error", 400);
//                 vaildationErrors.push({
//                     key,
//                     issues:value.error.issues,
//                 })
//             }
//             if(vaildationErrors.length >0){
//                 throw new BadRequestException("Validation error", 400);
//             }
//             next();
//         }
        
    
//     }
// };




export const validation = (Schema: ValidationSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {

        let validationErrors: any[] = [];

        for (const key of Object.keys(Schema) as ValidationKey[]) {

            const currentSchema = Schema[key];

            if (!currentSchema) {
                throw new BadRequestException("Validation schema not found", 400);
            }

            const result = currentSchema.safeParse(req[key]);

            if (!result.success) {
                validationErrors.push({
                    key,
                    issues: result.error.issues
                });
            }
        }

        if (validationErrors.length > 0) {
            throw new BadRequestException(
                "Validation error",
                400,
                { extensions: { error: validationErrors } }
            );
        }

        next();
    };
};

export const GQlValidation =(schema:ZodType , args:any) =>{
const vaildationResult = schema.safeParse(args)
console.log(vaildationResult);
let errormessage=[]
if (!vaildationResult.success) {
    errormessage.push(vaildationResult.error.issues)
    console.log(errormessage);
    throw  MapGraphQlError(new BadRequestException("somting wrong",400 ,{extensions:{error:errormessage}}))
    //throw new GraphQLError("vaildation error",{extensions:{error:errormessage}})
}
return true //no next in GQL
};


