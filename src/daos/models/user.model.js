import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    fisrt_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:false
    },
    age: {
        type:Number,
        required:false
    },
    email: {
        type: String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type: String,
        enum:["user","admin"],
        default: 'user',
    }
});

export const userModel = mongoose.model(usersCollection, usersSchema);
