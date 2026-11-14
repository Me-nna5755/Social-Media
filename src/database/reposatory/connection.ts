

import mongoose from "mongoose";
import { env } from "../../config/env.service";

export const databaseConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(
            // if condection بحيث نضمن انو موجود
            env.databaseURL as string //|| "mongodb://127.0.0.1:27017/social-media"  .... without undefiend
        ).then(()=>{
            console.log("database connected");
        })

    } catch (err) {
        console.log("database connection error", err);
        throw err;
    }
};
