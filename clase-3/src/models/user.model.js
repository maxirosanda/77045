import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String,
        minlength:6
    },
    githubId:{type:String},
    role:{
        type:String,
        enum:["admin","editor","user"],
        default:"user"
    }
})

export const UserModel = mongoose.model("User",userSchema)

