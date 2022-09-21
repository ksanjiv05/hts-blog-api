import { Document } from "mongoose"

interface IUser extends Document{
    email:string,
    name:string,
    password:string,
    isEmailVarified:boolean,
    recoveryCode:string,
    followers?:[{userId:string}],
    createdAt?: string,
    updatedAt?: string,
}

export {IUser}