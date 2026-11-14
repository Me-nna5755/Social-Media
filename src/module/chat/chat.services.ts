import { s3Service } from './../../common/services/s3.services';
import { Ichat } from "../../common/interfaces/chat.interface"
//import { chatSchema } from "../../database/model/chat.model"
import { DatabaseReposatory } from "../../database/reposatory/database.resposatory"
import { chatModel, chatSchema } from "../../database/model/chat.model"
import { BadRequestException, NotFoundException } from "../../common/exceptions/error.exeption"
import { Types } from "mongoose"
import { ChatEnum } from "../../common/enums/chat.enum"
import { IUser } from "../../common"
import userModel from "../../database/model/user.model"
import { randomUUID } from "crypto";

export class ChatService {
    private chatReposatory:DatabaseReposatory<Ichat>
    private userReposatory :DatabaseReposatory<IUser>
    private s3Service : typeof s3Service
    constructor(){
    this.chatReposatory = new DatabaseReposatory<Ichat>(chatModel)
    this.userReposatory = new DatabaseReposatory<IUser>(userModel);
    this.s3Service = s3Service;
    }

    messages(){
        return true
    }

    async getChat(participantId:string , userId:string){
        let chat =this.chatReposatory.findOne({filter:{participants:{
            $all:[participantId,userId]
        }},
        populate:[
            {path:"participants"}
        ]
    })
    console.log(chat);
    
    if (!chat) {
        
    }throw new NotFoundException("error", 400)
    return chat
    }

    async addChat(content:string , participantId:string  , userId:string ) {
        let chat = await this.chatReposatory.updateOne({
            filter:{
                participants:{
            $all:[ new Types.ObjectId(participantId) ,new Types.ObjectId(userId)  ]
        } ,
        type:ChatEnum.ovo
            },
            data:{
                $push:{
                    messages:{
                        content,
                        createdBy: new Types.ObjectId(userId) 
                    }
                }
            }
        })
        if (!chat.modifiedCount) {
    const addChat = await this.chatReposatory.create({
        participants: [
            new Types.ObjectId(userId),
            new Types.ObjectId(participantId)
        ],
        createBy: new Types.ObjectId(userId),
        type: ChatEnum.ovo,
        messages: [
            {
                content,
                createdBy: new Types.ObjectId(userId),
                attachments: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                restoreAt: null
            }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        restoreAt: null
    });
    return addChat
}
    }

    async createGroup(userId: string, body: any, file: string) {

    let { group, participants } = body;

        let participantsIds: Types.ObjectId[] | IUser = [
    ...new Set<Types.ObjectId>(
        participants.map((ele: string) => {
            return new Types.ObjectId(ele);
        })
    )
];

    let users = await this.userReposatory.findAll({
        filter: {
            _id: { $in: participantsIds },
            friends: { $in: [new Types.ObjectId(userId)] }
        }
    });

    if (participantsIds.length !== users.length) {
        throw new BadRequestException("error", 400);
    }

    const roomId = randomUUID();

    let image = undefined;

    // if (file) {
    //     image = await this.s3Service.uploadFile({ file });
    // }

    participantsIds.push(new Types.ObjectId(userId));

let chatGroup = await this.chatReposatory.create({
    participants: participantsIds as Types.ObjectId[],
    createBy: new Types.ObjectId(userId),
    messages:[],
    type: ChatEnum.ovm,
    group,
    roomId,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    restoreAt: null
});
    return chatGroup;
    }

    async getChatGroup(groupId:string , userId:string) {
        let chatGroup = await this.chatReposatory.findOne({
            filter:{
                _id: new Types.ObjectId(groupId)
                ,
                participants: { $in: [new Types.ObjectId(userId)] },
                type:ChatEnum.ovm
            },populate:[{path:"participants"}]
        })
        if (!chatGroup) {
            throw new BadRequestException("error", 400);
        }
    }

    async addgroupChat(content:string , participantId:string  , userId:string ) {
        let chat = await this.chatReposatory.updateOne({
            filter:{
                participants:{
            $all:[ new Types.ObjectId(userId)  ]
        } ,
        type:ChatEnum.ovm
            },
            data:{
                $push:{
                    messages:{
                        content,
                        createdBy: new Types.ObjectId(userId) 
                    }
                }
            }
        })
        if (!chat.modifiedCount) {
        throw new  NotFoundException("chat group not found",404)
        }
            return chat
    }

}
export const chatservice = new ChatService()