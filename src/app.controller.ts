import express from "express"
import type { Express ,Request,Response } from "express";
import authRouter from './module/auth/auth.controller'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import { env } from "./config/env.service";
import { databaseConnection } from "./database/reposatory/connection";
import { globalEerrorHandler } from "./middleware/errorHandling";
import { BadRequestException } from "./common/exceptions/error.exeption";
import { s3Service } from "./common/services/s3.services";
import {promisify} from "util";
import {pipeline} from "stream";
//import { SuccessResponce } from "./common/exceptions/success.responce";
import userRouter from "./module/user/user.controller"
import { redisService } from "./common/services/redis.serverice";
//import { GraphQLSchema} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { Schema1} from "./module/gql/schemagql"
import { Server } from "socket.io";
import { createServer } from "http";
import { TokenService } from "./common/services/token.service";
import { de } from "zod/v4/locales";
import { Types } from "mongoose";
import { assert } from "console";
import { realTimeGetway } from "./module/realtime/realtime.getway";

export const bootstrap = async ()=>{
const app:Express =express()
const s3SGetFile = promisify(pipeline)

    console.log("done");
    app.use(express.json())
    //app.all('/graphql', createHandler({ schema: Schema1 , context: (req)=> ({req}) }));
    app.use(cors({
        //origin :"http://localhost:4200",
        origin :"*",
       // methods:["GET" ,] 
    }))

    const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100,
    });
    app.use(limiter)
    app.use(helmet());
    databaseConnection()
    
    app.get('/health-check' , ( req:Request , res:Response )=>{
        res.json({
            message:"status ok"
            })
    })
    app.get('/uploads/*path' , async ( req:Request , res:Response )=>{
        //console.log(req.params)
        let {path} =req.params as {path?:string[]}
        if ( !path || path.length ==0) {
            throw new BadRequestException("Invalid file path", 400)
        }
        let key = path.join("/")
        let {Body ,ContentType} = await s3Service.getFile({Key:key})
        //console.log(data)
        s3SGetFile(Body as NodeJS.ReadableStream, res)
        res.setHeader("Content-Type", ContentType || "application/octet-stream");
        res.set("cross-orgin-resourse-policy","cross-orgin")
        return res
        //SuccessResponce({res,message:"success",status:200, data:ContentType})
        

    })
    app.use('/auth' , authRouter)
    app.use("/user" , userRouter)
    app.use(globalEerrorHandler)
    //redisService.connection()
    //const port:number =3000
await redisService.connection();




// Create HTTP Server and listen on port
const httpServer = app.listen(env.port, () => {
    console.log(`server done ${env.port}`);
});
realTimeGetway.initializer(httpServer)



    
//     // When user connects
//     console.log("User connected:", socket.id);
//     // When user disconnects
//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//     });
//     // Receive event from frontend
//     socket.on("sayHi", (data, callback) => {
//         console.log(data);
//         // Send acknowledgment to frontend
//         callback("backend received");
//         // Send message to all users in /socket namespace
//         socket.nsp.emit("send", "backend send message");
//         // Send message to current user only
//         socket.emit("send", "backend send message");
//         // Send message to all users except me
//         // socket.broadcast.emit("send", "backend send message");
//         // Send message to users in a specific room except me
//         // socket.to("room1").emit("send", "backend send message");
//     });
// });
// // Admin Namespace
// io.of("/admin").on("connection", (socket) => {
//     console.log("Admin connected:", socket.id);
//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//     }); })



















    }