import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please Enter Your Name"],
    },
    email:{
        type:String,
        required:[true, "Please Enter Your Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please Enter Your Password"],
    },
    role:{
        type:String,
        default:false


    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date


})








const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User