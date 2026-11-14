import mongoose from "mongoose";
import {  GenderEnum, IUser, ProviderEnum, Role } from "../../common";

const userSchema = new mongoose.Schema<IUser>({

    
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    confrimEmail: {
        type: Boolean,
        default: false
    },
    
    gender: {
        type: Number,
        default:GenderEnum.Male,
        required: true
    },
    profilePicture: {
        type: [String],
        default: []
    },
    provider: {
        type: Number,
        default:ProviderEnum.System
    },
    role: {
        type: Number,
        default: Role.User
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    friendRequests :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]

},{
        timestamps:true
    

})
//Menna ahmed
userSchema.virtual('userName').set(
    function (value) {
        let [firstName ,lastName] =value.split(" ")
        this.firstName = firstName
        this.lastName = lastName
    }
).get(
    function () {
        return `${this.firstName} ${this.lastName}`
    }
)


const userModel = mongoose.model<IUser>("user",userSchema)
export default userModel


