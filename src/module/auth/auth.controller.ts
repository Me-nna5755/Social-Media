import { Router, type Request,type Response } from "express";
import authServer from "./auth.server";
import { SuccessResponce } from "../../common/exceptions/success.responce";
import { auth, userRequest } from "../../middleware/auth.middleware";
import { checkRole } from "../../middleware/checkrole.middleware";
import { uploadFile } from "../../common/utils/multer/cloud";
import { MultersStorge } from "../../common/enums/multer.enum";
import {validation} from '../../common/services/vaildation';
import { signupSchema } from "./auth.validation";

const router:Router =Router()
    router.post('/login' , async( req:Request , res:Response )=>{
        let loginUser = await authServer.login(req.body)
        return  SuccessResponce({res, message:"login succeflly", status: 200 ,data:loginUser})
        res.json(
            { message:"hello auth" })
        })

    router.get("/get-all-users",async (req:Request,res:Response) =>{
        let userData = await authServer.getAllUsers()
        return    SuccessResponce({res, message:"users data", status: 200 ,data:userData})
        })

    router.get("/get-users-Byid/:id",auth,checkRole([1]) //checkRole(["1"])
    , async (req:userRequest,res:Response) =>{
        const id = req.params.id;

        if (typeof id !== "string") {
            throw new Error("Invalid user ID");
        }
            let userData = await authServer.getUserBYid(id)
            return    SuccessResponce({res, message:"users data", status: 200 ,data:userData})
        })
    
    router.get("/get-users-findone",async (req:Request,res:Response) =>{
        const id = req.params.id;

        if (typeof id !== "string") {
            throw new Error("Invalid user ID");
        }
            let userData = await authServer.getUserBYid(id)
            return    SuccessResponce({res, message:"users data", status: 200 ,data:userData})
        })

    // router.post('/signup' ,
    //         uploadFile({storageKey:MultersStorge.diskStorge}).single("file") ,validation(signupSchema),async( req:Request , res:Response )=>{
    //             let {key} = req.query as {key?:string}
    //             console.log("Body:", req.body);
    //             console.log("File:", req.file);
    //     let data = await authServer.signup(req.body , req.file as Express.Multer.File, key)
    //     return SuccessResponce({res, message:" user registed", status: 201 ,data:data})
    //     res.json(
    //         { message:"hello auth" })
    //     })

    router.post(
    "/signup",
    uploadFile({ storageKey: MultersStorge.diskStorge }).single("file"),
    validation({
        body: signupSchema.body
    }),
    async (req: Request, res: Response) => {

        const { key } = req.query as { key?: string };

        console.log("Body:", req.body);
        console.log("File:", req.file);

        const data = await authServer.signup(
            req.body,
            req.file as Express.Multer.File,
            key
        );

        return SuccessResponce({
            res,
            message: "user registered",
            status: 201,
            data
        });
    }
);
    router.put("/verify-user-connect",auth,async(  req:userRequest ,res:Response)=>{
            let userdata =await authServer.verifyUsers(req.body)
            SuccessResponce({res, message:"users updata", status: 200 ,data:userdata})
            })   
        
export  default router