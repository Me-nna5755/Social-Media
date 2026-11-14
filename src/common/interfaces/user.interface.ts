import { Types } from "mongoose";
import { GenderEnum, ProviderEnum, Role } from "../enums/user.enums";




export interface IUser{
    userName:string,
    firstName:string,
    lastName:string,
    email:string,
    phone:string,
    profilePicture?: string[],
    password:string,
    confrimEmail:boolean,
    gender?: GenderEnum,
    provider?: ProviderEnum,
    role?: Role,
    friends: Types.ObjectId[];
    friendRequests: Types.ObjectId[];
}