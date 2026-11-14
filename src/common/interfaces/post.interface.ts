
import { Types } from "mongoose";

export interface IPost {
    title: string;
    content: string;
    userId: Types.ObjectId;
    comments?: Types.ObjectId[];
    likes?: Types.ObjectId[];
    tags?: string[];
    deletedAt?: Date | null;
    restoredAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}