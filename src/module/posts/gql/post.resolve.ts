
import { TokenService } from '../../../common/services/token.service';
import { postService } from './../post.service';
import { JwtPayload } from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { BadRequestException, MapGraphQlError } from '../../../common/exceptions/error.exeption';
import { GQlValidation } from '../../../common/services/vaildation';
import { postVaildation } from '../post.vaildation';

class PostResolver {
    private tokenservice : TokenService
    private postservice: typeof postService;
    constructor() {
        this.postservice =  postService;
        this.tokenservice = new TokenService
    }
    postList = async (parent: any, args: any ,context :any) => {
        //console.log({token :context.req.Headers.authorization});
        let tokenHeaders =context.req.Headers.authorization
        let [bearer , token] = tokenHeaders.split(" ")
        GQlValidation(postVaildation , args)
        throw  MapGraphQlError(new BadRequestException("somting wrong",400))
        //  GraphQLError("token not valid " , {
        //     extensions:{
        //         statusCode:400,
        //         code:"test"
        //     }
        // })
        let decoded = await this.tokenservice.decodeToken(token)
        console.log(decoded);
        let {id} = decoded as JwtPayload
        let postData = await this.postservice.getAllposts(id );//send decoded
        console.log(postData);
        
        return {
            message :postData
        } 
    }

    createPost =async (parent: any, args: any) => {
        let addedPost = await this.postservice.Createposts(args)
        return addedPost
    }


}

export const postResolve = new PostResolver();