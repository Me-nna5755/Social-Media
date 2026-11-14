import { redisService } from './../../../common/services/redis.serverice';
import { chatservice, ChatService } from './../chat.services';


export   class ChatEvent {
    
    private Chatservice :  ChatService
    private rediservice : typeof redisService

    constructor() {
        this.Chatservice = chatservice
        this.rediservice =redisService
    }


    sayHi(socket:any){
        let messages = this.Chatservice.messages()
        return socket.on("sayHi" , (data:any)=>{
            console.log(data);
            
        })
        
    }

    addMessage(socket:any , io:any){
        return socket.on("addMeaasge" ,async (data:any)=>{
            console.log(data);
            let { content , sendTo } =data
            let sendersocketIds = await redisService.getSocket(socket.data.id)
            let reciverSocketIds = await redisService.getSocket(sendTo)
            let socketids = [...sendersocketIds,...reciverSocketIds]
            let chat =  await this.Chatservice.addChat( content , socket.data.id ,sendTo )
            io.to(socketids).emit("successfully", {content ,sendTo})
            if (reciverSocketIds.length > 0) {
                io.to(reciverSocketIds).emit("newMessages",{content , from:socket.data.id})
            }
        })
    }

    addChatMessage(socket:any , io:any){
        return socket.on("sendChatMeaasge" ,async (data:any)=>{
            console.log(data);
            let { content , groupId } =data

            let sendersocketIds = await redisService.getSocket(socket.data.id)
            let reciverSocketIds = await redisService.getSocket(groupId)
            let socketids = [...sendersocketIds,...reciverSocketIds]
            let chat =  await this.Chatservice.addgroupChat( content , socket.data.id ,groupId )
            io.to(socketids).emit("successfully", {content ,groupId})
            
            if (reciverSocketIds.length > 0) {
                io.to(reciverSocketIds).emit("newMessages",{content , from:socket.data.id})
            }
        })
    }
}

export const chatEvent = new ChatEvent()