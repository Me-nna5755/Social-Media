
import {   GraphQLString } from "graphql";
import { helloWorldGqlType, hellwordMutationtype } from "./usertypeshema.ts";
import { helloworldGQlArgs, helloworldGQlArgsMUtation } from "./user.args.gql.js";
import { userResolve } from "./userresolvegql.js";

export class UserGqlSchema{
        constructor(){}

        registerQuery(){
                            return{
                            helloWorld:{
                            type:helloWorldGqlType,
                            args:helloworldGQlArgs,                                
                            resolve:userResolve.helloWord
                        } ,
                        test:{
                            type:GraphQLString,
                            resolve:userResolve.testquery
                        }
        }
    }

    registerMutation(){
        return {
            helloWorld:{
                    type:hellwordMutationtype,
                    args:helloworldGQlArgsMUtation,
                    resolve:userResolve.helloresolveMUtation
                } ,
                test:{
                    type:GraphQLString,
                    resolve:userResolve.testMutation
                }
        }
    }
}

export const userGqlSchema = new UserGqlSchema