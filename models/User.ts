import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    favorites:{
        type:[{type:Number}],
        default:[]
    }
})

const User = mongoose.models.User || mongoose.model("User",UserSchema)

export default User