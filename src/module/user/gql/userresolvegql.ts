

class UserResolver {
    constructor() { }

    helloWord(parent:any , args:any){
                                    //console.log(args);
                                    let {name,email,password} =args
                                    return{
                                        message:`my name is ${name} and ${email} .. ${password}`
                                }}

    testquery(){
                                return "hello world test"
                            }

    helloresolveMUtation(parent:any , args:any){
                            //console.log(args);
                            let {name,email,password} =args
                            return{
                                message:`my name is ${name} and ${email} .. ${password}`
                        }}
    testMutation(){
                        return "hello world test"
                    }
    
    
}

export const userResolve= new UserResolver