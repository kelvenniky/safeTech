import mongoose from "mongoose"
const adminSchema = new mongoose.Schema({
    name: String,
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:String,
    profilePic: String,
    role:String,
},{
    timestamps:true
})

const adminModel = mongoose.model("admins", adminSchema)

export default adminModel