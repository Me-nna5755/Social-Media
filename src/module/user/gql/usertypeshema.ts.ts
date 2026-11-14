
import { GraphQLObjectType ,GraphQLString , GraphQLBoolean,GraphQLID , GraphQLList, GraphQLNonNull, GraphQLEnumType} from "graphql";
import { GenderEnum, ProviderEnum, Role } from "../../../common";


export const helloWorldGqlType = new GraphQLObjectType({
                                    name :"helloquery",
                                    fields:{
                                        message:{
                                            type:GraphQLString
                                        }
                                    }
})

export const hellwordMutationtype = new  GraphQLObjectType({
                        name :"helloquerymution",
                        fields:{
                            message:{
                                type:GraphQLString
                            }
                        }
})
export const OneUserType = new GraphQLObjectType({
    name :"OneUserType",
    fields:{
        userName: {type:  new GraphQLNonNull(GraphQLString) },
        firstName: {type: GraphQLString},
        listName: {type: GraphQLString},
        email: {type:  new GraphQLNonNull(GraphQLString) },
        phone: {type:  new GraphQLNonNull(GraphQLString) },
        profilePicture: {type: new GraphQLList(GraphQLString)},
        password: {type:  new GraphQLNonNull(GraphQLString) },
        confrimEmail: {type: GraphQLBoolean},
        gender: {type: new GraphQLEnumType({
            name:"GenderEunmGql",
            values:{
            Male: {value: GenderEnum.Male},
            Female: {value: GenderEnum.Female}
            }

        })},
        provider: {type:  new GraphQLEnumType({
            name:"ProviderEunmGql",
            values:{
            System: {value: ProviderEnum.System},
            Google: {value: ProviderEnum.Google}
            }})},
        role: { type:  new GraphQLEnumType({
            name:"RoleEunmGql",
            values:{
            User: {value:Role.User },
            Admin: {value: Role.Admin}
            }})

        }
    } 
})