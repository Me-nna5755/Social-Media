import { ChatEnum } from './../../common/enums/chat.enum';
import { Schema ,Types} from "mongoose";
import { Ichat, IMessage } from "../../common/interfaces/chat.interface";
import { model } from "mongoose";


export const MessageSchema = new Schema<IMessage>({
    content: {
            type: String,
            required: function (this) {
                return !this.attachments?.length
            },
            trim: true
        },

        attachments: {
            type: [String]
        },

        likes: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],

        tages: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        createdAt:{
            type:Date,
            default:Date.now
        },

        deletedAt: {
            type:Date,
            default:null
        },
        updatedAt:{
            type:Date,
            default:Date.now
        },
        restoreAt:{
            type:Date,
            default:null
        },
        
    },
    {
        timestamps: true
})


export const chatSchema =new Schema<Ichat>({
    participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],

        createBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        type: {
            type: String,
            enum: ChatEnum,
            default:ChatEnum.ovm,
            required: true
        },

        group: {
            type: String
        },
        messages:{
            type:[MessageSchema],
            required:true
        },
        groupImage: {
            type: String,
            required:false
        },

        roomId: {
            type: String,
            unique: true,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        },

        deletedAt: {
            type:Date,
            default:null
        },
        updatedAt:{
            type:Date,
            default:Date.now
        },
        restoreAt:{
            type:Date,
            default:null
        },
    },
    {
        timestamps: true,
        toJSON:{virtuals:true},
        strict:true
    }
)


export const chatModel = model<Ichat>("Chat", chatSchema);