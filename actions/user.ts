import { options } from "@app/api/auth/[...nextauth]/option"
import { connectToDB } from "@lib/mongoDB"
import User from "@models/User"
import { getServerSession } from "next-auth"

export const fetchMyList = async()=>{
    const session = await getServerSession(options)

    if(!session){
        throw new Error("No user Logged in")
    }

    await connectToDB

    const user = await User.findOne( { email : session?.user?.email } )

    if(!user){
        throw new Error("User not found")
    }
    return user.favorites
}