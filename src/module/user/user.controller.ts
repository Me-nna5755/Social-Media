import { Request, Response, Router } from "express";
import { userService } from "./user.services";
import { auth, userRequest } from "../../middleware/auth.middleware";
import { SuccessResponce } from "../../common/exceptions/success.responce";

    const router = Router()

            // router.get("/test",(  req:Request ,res:Response)=>{
            // let data =userService.test()
            // res.json(data)
            // })

            router.put("/update-user",auth,async(  req:userRequest ,res:Response)=>{
            let updateUser =await userService.updataUser(req.user.id as string , req.body)
            SuccessResponce({res, message:"users updata", status: 200 ,data:updateUser})
            })

            router.delete("/delete-user",auth,async(  req:userRequest ,res:Response)=>{
            let deleteUser =await userService.deleteUser(req.user.id as string )
            SuccessResponce({res, message:"users updata", status: 200 ,data:deleteUser})
            })

            


    export default router 
