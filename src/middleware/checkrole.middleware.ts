import { NextFunction, Request, Response } from "express";
import { IUser } from "../common";
import userModel from "../database/model/user.model";
import { DatabaseReposatory } from "../database/reposatory/database.resposatory";
import { BadRequestException } from "../common/exceptions/error.exeption";
import { userRequest } from "./auth.middleware";

const userReposatory = new DatabaseReposatory<IUser>(userModel);
export const checkRole = (roles: number[]) => {

    return async (req: userRequest, res: Response, next: NextFunction) => {
        let userdata = await userReposatory.findById({ id:req.user.id});
        if (!userdata) {
            throw new BadRequestException("user not found",404)
            
        }
        //console.log("User Role:", userdata.role);
        //console.log("Allowed Roles:", roles);
        if (!roles.includes(userdata.role)) {
            throw new BadRequestException("unauthorization",403)
        }

        // if (roles.includes(req.user.role)) {
        //     throw new BadRequestException("unauthorization",400)
        // }
        next();
    };
};

