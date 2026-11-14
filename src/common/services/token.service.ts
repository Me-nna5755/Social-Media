import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { env } from "../../config/env.service";
import { BadRequestException } from '../exceptions/error.exeption';


export class TokenService {
    constructor(){}
    
    generateToken(user:any){
    let signature =undefined;
    let audience =undefined;
    let refeshsignature=undefined;

    switch (user.role) {
        case "0":
            signature=env.adminSignature
            audience ="Admin"
            refeshsignature=env.adminRefreshSignature
            break;
        default:
            signature=env.userSignature
            audience ="User"
            refeshsignature=env.userRefreshSignature
            break;
    }
    let accessToken =jwt.sign({id:user._id},signature as string,{ audience,expiresIn:"30min"})
    let refreshToken=jwt.sign({id:user._id},refeshsignature as string,{audience, expiresIn:"1y"})

    return {accessToken,refreshToken}
    }

    decodeToken(token:string){
    let decode=jwt.decode(token)as JwtPayload
    if (!decode) {
        throw new BadRequestException("token not vaild",400)
    }
    let signature=undefined
    switch (decode.aud) {
        case "Admin":
            signature=env.adminSignature
            break;
        default:
            signature=env.userSignature
            break;
    }
    let decodedData=jwt.verify(token,signature as string)
    return decodedData
    }

    decoderefershToken(refreshtoken:string){
    let decode=jwt.decode(refreshtoken)as JwtPayload
    if (!decode) {
        throw new BadRequestException("refreshtoken not vaild",400)
    }
    let refreshsignature=undefined
    switch (decode.aud) {
        case "Admin":
            refreshsignature=env.adminRefreshSignature
            break;
        default:
    refreshsignature=env.userRefreshSignature
            break;
    }
    let decodedData=jwt.verify(refreshtoken ,refreshsignature as string)
    if (decodedData) {
        return decodedData
    }else{
        throw new BadRequestException("vaild",400)
    }
    
    }
}