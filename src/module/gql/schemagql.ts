import { GraphQLObjectType , GraphQLSchema } from "graphql";
import { userGqlSchema } from "../user/gql/userSchemagql";
import { postgqlschema } from "../posts/gql/post.schema.gql";


        export const query = new GraphQLObjectType({
            name:"RootQuery",
            fields:{
                ...userGqlSchema.registerQuery(),
                ...postgqlschema.registerQuery()
            }
        })

        export  const mutation = new GraphQLObjectType({
            name:"RootQuerymution",
            fields:{...userGqlSchema.registerMutation(),
                ...postgqlschema.registerMution()
            }
        })

    export   const Schema1 = new GraphQLSchema({ query , mutation })