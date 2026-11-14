import { resolve } from "nodemailer/lib/shared/url.js"
import { getAllPostsType, onePostType, posrlistcreate, posrlistgqlTypes } from "./post,typesgql"
import { addPost, PostlistArgd } from "./postlistgqlArgs"
import { postResolve } from "./post.resolve"



class PostGQlSchema {
    constructor() {}

    registerQuery(){
    return{
        postList :{
        name:"postlistQuery",
        type:getAllPostsType,
        args:PostlistArgd,
        resolve:postResolve.postList
        }
    }
    }

    registerMution(){
    return{
        addpost:{
        name:"CreatePostMution",
        type:posrlistcreate,
        args:addPost,
        resolve:postResolve.createPost
        }
    }
    }
}

export const postgqlschema = new PostGQlSchema