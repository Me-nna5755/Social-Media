

//console.log(778899);

import { bootstrap } from "./app.controller.js";

// data Autation

//   ||>> or   |>>> type

// let x >>>>>>> js
//let x : string  // boolean number [number, boolean]
//x="menna"
//x=88

//let x:(string | number)[] =[12344, "kkkk" ] >>> arrry

//let x:{age: number} ={  "age": 12344 } .>>> obj


//let x:any={  "age": 12344 } //يفضل في ضروره قسوا

//let x :number = 10 // data type
//let y = Number("5")  //covert from to type anther type >>>> Boolean String 
//console.log(x,y);


// interface IUser {
//     name:string,
//     age:number
// }
// let z : IUser={
//     name:"ali",
//     age:5
// }


// interface IUser{
//     x:string,
//     y:number
// }
// class User implements IUser {
//     x:string 
//     y:number
//     constructor(x:string, y:number) {
//         this.x=x,
//         this.y=y
//     }

//     display() {
//         console.log(`hello ${this.x}`);
        
        
//     }
// }
//     const user1 = new User("menna ahmed" , 10)
//     console.log(user1);
//     user1.display()


// oop
//encupsolion


// class Person {
//     public name: string;
//     public age: number;
//     public email: string;
//     protected nationalId: string;
//     private password:string;

//     constructor(
//         name: string,
//         age: number,
//         email: string,
//         nationalId: string,
//         password:string
//     ) {
//         this.name = name;
//         this.age = age;
//         this.email = email;
//         this.nationalId = nationalId;
//         this.password=password
//     }

//     getNationalId(): string {
//         return this.nationalId;
//     }

//         setNationalId(nationalId: string): void {
//         this.nationalId = nationalId;
//     }
// }


// const person1 = new Person(
//     "Menna",
//     22,
//     "menna@gmail.com",
//     "12345678901234",
//     "5555"
// );

// console.log(person1.name);
// console.log(person1.age);
// console.log(person1.email);
// console.log(person1.getNationalId());
// person1.setNationalId("98765432109876");
// console.log(person1.getNationalId());

// class Doctor extends Person {
//     salary:number
//     id:string
//     constructor (name:string,age:number, email:string ,salary :number , id:string) {
//         super(name , age ,email ,"000" ,'455566')
//         this.salary=salary
//         this.id=id
//     }

//     addDoctor(){
//         //return this.nationalId
//         return this.setNationalId("00000000000")
//     }
// }

// const dr1=new Doctor(
// "Menna2",
//     22,
//     "menna@gmail.com",
//     2000,
//     "1"
// )
// console.log(dr1);


//Abstructor  زي فاكنشن دي هي فاكنشن ب تكول فاكنشن من غير ما تشوف لوجك بتاعها
 //addDoctor(){
//         return this.setNationalId("00000000000")
//     }
    
    // inhertiance >>> extends  super

    //perfermanize
    
    // class Person {
    // public name: string;
    // public age: number;
    // constructor(  name: string, age: number) {
    //     this.name = name;
    //     this.age = age;
    // }
    // }

    // class Doctor extends Person {
    //     id:string
    //     constructor(name:string ,age:number ,id:string) {
    //         super(name,age)
    //         this.id=id
    //     }
    //     sayHi(){
    //     console.log("hi doctor");
        
    //     }
    // }

    // class Developer extends Person {
    //     id:string
    //     constructor(name:string ,age:number ,id:string) {
    //         super(name,age)
    //         this.id=id
    //     }
    //     sayHi(){
    //     console.log("hi developer");
    //     }
    // }

    // const dr1=new Doctor("Menna2",  22, "1")
    // const dev1=new Developer("Menna3",  23, "2")
    // dr1.sayHi()
    // dev1.sayHi()


    // short hand class

    //class Person {
    //constructor( public name: string,public age: number) {
    //}}
    //const dr1=new Person("Menna2",  22)


    //optional , required

        // class Person {
        // public name: string;
        // public age?: number |undefined;
        // //اي حاجه اوبشنل ضيفها في الاخر       
        // constructor(  name: string, age?: number) {
        //     this.name = name;
        //     this.age = age;
        // }
        // }
        // const dr1=new Person("Menna2") 


        // ts server
        bootstrap()
        