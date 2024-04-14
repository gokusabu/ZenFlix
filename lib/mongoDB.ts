import mongoose from "mongoose";

let isConnected : boolean = false

export const connectToDB = async() : Promise<void>=>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("mongo db running...")
        return
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL || "",{
            dbName : "ZenHub"
        })
        isConnected = true
        console.log("mongodb connected successfully")
    }
    catch(err){
        console.error(err)
    }
}