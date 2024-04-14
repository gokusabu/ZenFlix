import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async(req:NextResponse) =>{
    try{
        await connectToDB()

        const { email , username , password } = await req.json()

        const existingUser = await User.findOne({email})

        if(existingUser){
            return new Response("User alresdy Exists" , {status:400})
        }

        const hashedPassword = await hash(password,12)

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })
        await newUser.save()

        return new Response(JSON.stringify(newUser), {status:200})
        
    }catch(err){
        console.log(err)
        return new Response("error registering" ,{status : 500})
    }
}