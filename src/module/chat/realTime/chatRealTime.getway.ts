import { ChatEvent } from "./chatEvents"



export  class  ChatGetway {
    private chatevent : ChatEvent
    constructor() {
        this.chatevent = new ChatEvent()
        
    }

    register(socket:any , io:any ){
        return  this.chatevent.sayHi(socket)
        this.chatevent.addMessage(socket , io)
    }
}
export const realTimechat = new ChatGetway()