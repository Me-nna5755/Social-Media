
import { NextFunction, Router } from "express";
import { chatservice } from "./chat.services";
import { auth, userRequest } from "../../middleware/auth.middleware";
import { SuccessResponce } from "../../common/exceptions/success.responce";


const router =Router()

router.get("/:participantId" ,auth ,async(req:any,res:any , next:NextFunction)=>{
    let chat = await chatservice.getChat(req.params.participantId , req.user.id)
    SuccessResponce({res, message:"users updata", status: 200 ,data:chat})
})

router.get("/" ,async(req:any,res:any , next:NextFunction)=>{
    return "test"
})

router.post('/gourp',auth,async(req:userRequest,res:any , next:NextFunction)=>{
    let data= await chatservice.createGroup(req.user.id,req.body , "file"
        //req?.file :Express.Multer.File
        )
})

router.get("/group/groupId" ,auth ,async(req:any,res:any , next:NextFunction)=>{
    let chat = await chatservice.getChatGroup(req.params.groupId, req.user.id)
    SuccessResponce({res, message:"users updata", status: 200 ,data:chat})
})




export default router