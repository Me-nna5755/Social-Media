import { NextFunction, Request, Response } from "express";

export const globalEerrorHandler =(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    if (res.headersSent) {
        return next(err);
    }
    return res.status(err.status || 500).json({
    message:err.message,
    stack:err.stack ,
    cause: err.cause,
    err
    }
    
    )
}




