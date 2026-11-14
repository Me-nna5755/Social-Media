import { Socket } from 'dgram';
import { Server } from "socket.io";
import { TokenService } from "../../common/services/token.service";
import { BadRequestException } from "../../common/exceptions/error.exeption";
import { redisService } from "../../common/services/redis.serverice";
import { NextFunction } from 'express';
import { realTimechat } from '../chat/realTime/chatRealTime.getway';


export class ReakTimeGetway {
    private tokenService: TokenService;
    private redisservice: typeof redisService;
    constructor() {
    this.tokenService = new TokenService();
    this.redisservice = redisService;
}
    
    authinicate = async (socket:any , next:any)=>{
    try {
    const tokenService = new TokenService();
    const decodedData = this.tokenService.decodeToken(socket.handshake.auth.token);
    if (!decodedData) {
        throw new BadRequestException("error" ,400)
    }
    const userId =( typeof  decodedData === "object" && decodedData.id ) || undefined
    console.log("User connected:", socket.id ,userId);
    socket.data = decodedData
    next();
    } catch (error) {
        next(error as Error);
    }
    
    }
    
    initializer(httpServer:any){
    // Create Socket.IO Server
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});
// Socket Namespace

io.use(this.authinicate)
io.on("connection", async (socket) => {
    try {
        let userId =socket.data.id
        realTimechat.register(socket , io )
    await this.redisservice.addSocket(userId,socket.id)
    console.log(await this.redisservice.get(userId))
    socket.on("disconnect", async () => {
        console.log("User disconnected:", socket.id);
        await redisService.removeSocket(userId, socket.id)
    });

    } catch (error) {
        socket.emit("custum_error" , error)
        
    }
    //const token = socket.handshake.auth?.token;
    });
    }}

    export const realTimeGetway = new ReakTimeGetway()