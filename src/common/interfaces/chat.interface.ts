import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ChatEnum } from "../enums/chat.enum";


export interface IMessage {
    content: string;
    attachments: string[];
    likes?: Types.ObjectId[];
    tages?: Types.ObjectId[];

    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;

    deletedAt: Date | null;
    restoreAt: Date | null;
}

export interface Ichat {
    participants: Types.ObjectId[];
    createBy: Types.ObjectId;
    messages: IMessage[];
    type: ChatEnum;

    group?: string;
    groupImage?: string;
    roomId?: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    restoreAt: Date | null;
}



