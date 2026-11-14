import { IPost } from "../../common/interfaces/post.interface";
import postModel from "../../database/model/post.model";
import { DatabaseReposatory } from "../../database/reposatory/database.resposatory";


    export  class PostService {
        private postReposatary:DatabaseReposatory<IPost>
        constructor() {
            this.postReposatary =new DatabaseReposatory<IPost>(postModel)
        }

    async getAllposts(id:string){
        let postData = await this.postReposatary.findOne({ filter:{_id:id}
            // populate:[
            //     {
            //         path:"userId",
            //         select:"name"
            //     }
            // ]
        })
        return postData
    }

    async Createposts(data:IPost){
        let postData = await this.postReposatary.create(data)
        return {
            message: "post created" , postData
        }
    }
}

    export const postService = new PostService();
    