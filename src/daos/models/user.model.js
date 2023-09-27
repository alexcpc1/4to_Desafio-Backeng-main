import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: String,

    age: Number,

    email: {
        type: String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
     cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"carts"
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin", "premium"],
        default:"user"
    },
    documents:{type: [
        {
            name:{type:String, required: true},
            reference:{type:String, required: true}
        }
        ], default: []
    },
    last_connection:{
        type:Date, 
        default: null
    },
    status: {
        type: String, 
        required: true,
        enum:["incompleto", "completo", "pendiente"], 
        required: true, 
        default: "pendiente"
    },
    avatar: {
        type: String, 
        default: ""
    }
});

export const userModel = mongoose.model(usersCollection, usersSchema);
