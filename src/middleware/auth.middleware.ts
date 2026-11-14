import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../common/exceptions/error.exeption";
import { TokenService } from '../common/services/token.service';

export interface userRequest extends Request{
    user?:any
}


let tokenService = new TokenService()

export const auth = ( req: userRequest, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
    let [flag ,token] =req.headers.authorization.split(" ")
    let data = tokenService.decodeToken(token as string)
    if (data) {
        req.user=data
        next()
        
    }
    } else {
    throw new BadRequestException("token not found",400)
    }
};
