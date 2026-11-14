import { TokenService } from './../../common/services/token.service';
import {MultersStorge} from "../../common/enums/multer.enum"
import { IUser } from "../../common";
import { BadRequestException, NotFoundException } from "../../common/exceptions/error.exeption";
import { compareHash, generatHash } from "../../common/secuirty/secuirty";
import userModel from "../../database/model/user.model";
import { DatabaseReposatory } from "../../database/reposatory/database.resposatory";
import { s3Service } from '../../common/services/s3.services';
import {signupSchema} from '../../module/auth/auth.validation';
import {signupDto} from './dto/auth.dto'
import { redisService } from '../../common/services/redis.serverice';
import { Types } from 'mongoose';

class AuthService{

    private userReposatory :DatabaseReposatory<IUser>
    private tokenService:TokenService

    constructor(){
        this.userReposatory = new DatabaseReposatory(userModel)
        this.tokenService = new TokenService()
    }

    async  getAllUsers() {
        let userdata= await this.userReposatory.findAll({}) //findAll({select:"email password"}) >>only email ,pass
        return userdata
    }

    async  getUserBYid(id:string) {
        let userdata= await this.userReposatory.findById({ id ,select:"email password"}) //findAll() >>only email ,pass
        return userdata
    }

    async  getUsetfindone(id:string) {
        let userdata= await this.userReposatory.findOne({ filter: {_id:id},select:"email password"}) 
        return userdata
    }

    async  login(data:any) {
        let {email , password}  =data
        let userData =await this.userReposatory.findOne({filter:{email}})
        if (userData) {
            let matchpass=await compareHash({ planText:password , cypherText:userData.password })
            if (matchpass) {
                let {accessToken , refreshToken} = this.tokenService.generateToken(userData)
                return  {accessToken , refreshToken} //"login data missing token" //userData
            } else{
                throw new BadRequestException("password missing",400 )
            }
            //console.log(userData);
        } else {
            throw new NotFoundException("user unfound",404)
        }
        
    }

    async signup(data:signupDto , file:Express.Multer.File ,key?:string) {

        let {error} = signupSchema.body.safeParse(data)
        if (error) {
            throw new BadRequestException(error.message, 400)
        }

        //console.log(validate);
        console.log("File signup:", file);
        const { userName,firstName,lastName,email,phone,password , confirmEmail} = data;
        

        let encryptedPassword = await generatHash({planText:data.password})
        data.password=encryptedPassword
        let pic: string[] =[]

        //redisService.set
        //let uploadFile = await s3Service.deleteFile({Key:key as string})
            //return uploadFile

            // let uploadFile = await s3Service.CreatePresignedUrl({
            // path: "general",
            // ContentType: file.mimetype,
            // OriginalName: file.originalname
            // })

        // if (file) {
        //     let uploadFile = await s3Service.CreatePresignedUrl({
        //     path: "general",
        //     ContentType: file.mimetype,
        //     OriginalName: file.originalname
        //     })
        //     pic.push(uploadFile.key)
        //     console.log("File signup:", pic);
        //     }
        if (file) {
    const uploadedKey = await s3Service.uploadFile({
        storageKey: MultersStorge.diskStorge,
        path: "users/profile",
        file,
        contentType: file.mimetype
    });

    pic.push(uploadedKey);

    console.log("Uploaded to S3:", uploadedKey);
}
            const otp = Math.floor(100000 + Math.random()*900000)

        let adduser= await this.userReposatory.create({
            userName,
            firstName,
            lastName,
            email,
            phone,
            password:encryptedPassword,
            confrimEmail: false,
            profilePicture:pic ,
            friends: [],
            friendRequests: []
        })
            await redisService.set(
            `otp::${adduser._id}`,
            otp.toString(),
            60 * 5
            );
        console.log(otp);
        
            if (!adduser) {
                throw new BadRequestException("something went wrong" , 400)
            }
        console.log(data);  
        return adduser

    }

    async verifyUsers(data: { email: string; otp: string }) {
    const { email, otp } = data;
    const userdata = await this.userReposatory.findOne({filter: { email }});
    if (!userdata) {
        throw new NotFoundException("User not found", 404);
    }
    const userotp = await redisService.get(`otp::${userdata._id}`);
    if (otp !== userotp) {
        throw new BadRequestException("Invalid OTP", 400);
    }
    const updateUser = await this.userReposatory.updateOne({filter: { _id: userdata._id },data: {confrimEmail: true}});
    return updateUser;
    }

    
}

export default new AuthService()