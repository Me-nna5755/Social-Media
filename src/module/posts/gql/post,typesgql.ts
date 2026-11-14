import { GraphQLObjectType, GraphQLString ,GraphQLID,GraphQLList } from "graphql";
import { OneUserType } from "../../user/gql/usertypeshema.ts";



export const posrlistgqlTypes = new GraphQLObjectType({
    name:"PostlistType",
    fields:{
        message:{type:GraphQLString}
    }

})
export const posrlistcreate = new GraphQLObjectType({
    name:"PostlistType",
    fields:{
        message:{type:GraphQLString}
    }

})
export const onePostType = new GraphQLObjectType({
    name:"onepostype",
    fields: {
        title: {type: GraphQLString },
        content: { type: GraphQLString},
        userId: {type: GraphQLID},
        comments: {type: new GraphQLList(GraphQLID)},
        likes: { type: new GraphQLList(OneUserType)},
        tags: { type: new GraphQLList(OneUserType) },
        deletedAt: { type: GraphQLString },
        restoredAt: { type: GraphQLString },
        createdAt: { type: GraphQLString  },
        updatedAt: {type: GraphQLString}
    }
})

export const getAllPostsType =new GraphQLObjectType({
    name:"GetAllPostsType",
    fields:{
        message :{ type :new GraphQLList(onePostType)}
    }
})