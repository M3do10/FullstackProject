import { model, Schema } from "mongoose";


const userSchema = new Schema({
    fname:String,
    lname:String,
    age:Number,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    isConfirmed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true, //createdAt, updatedAt
    versionKey:false

})

export const userModel = model("User", userSchema)