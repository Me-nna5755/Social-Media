
import de from "zod/v4/locales/de.js";
import { IUser } from "../../common";
import { BadRequestException } from "../../common/exceptions/error.exeption";
import userModel from "../../database/model/user.model";
import { DatabaseReposatory } from "../../database/reposatory/database.resposatory";

class UserService{
    
    private userReposatory :DatabaseReposatory<IUser>
    
    constructor(){
        this.userReposatory = new DatabaseReposatory<IUser>(userModel)
    }

    async updataUser(id:string ,data:IUser){
        let {email ,phone ,userName} =data
    let updateUser =await this.userReposatory.updateOne({filter:{_id:id},data:{email,userName,phone}})
    if (!updateUser) {
        throw new BadRequestException("something wrong" , 400)
    }
    return {message: "userupdate" , updateUser} 
    }

    async deleteUser(id:string ){
        
    let deleteUser =await this.userReposatory.deleteOne({filter:{_id:id}})
    if (!deleteUser) {
        throw new BadRequestException("something wrong" , 400)
    }
    return {message:"user deleted" , deleteUser}
    }


}
export const userService= new UserService()