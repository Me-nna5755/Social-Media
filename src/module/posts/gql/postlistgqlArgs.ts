import { GraphQLID, GraphQLList, GraphQLString } from "graphql"



export const PostlistArgd ={

}

export const addPost ={
    title :{type:GraphQLString},
    content :{type:GraphQLString},
    userId :{type:GraphQLID},
    comments:{type: new GraphQLList(GraphQLID)},
    likes:{type: new GraphQLList(GraphQLID)},
    tags:{type: new GraphQLList(GraphQLID)},
}