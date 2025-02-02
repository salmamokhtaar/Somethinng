import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel"
import { NextResponse ,NextRequest} from "next/server";
import bcryptjs from 'bcryptjs';




connect();
// inta wixi get post delete update ku wada qoree wuxu noqona /api/users/signup only

export async function POST(request:NextRequest){

    try {
        // waxa rabtid 
        const reqBody = await request.json()
        const {username,email,password} = reqBody;

          console.log(reqBody)
        //check if user already exist
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error:"User already exist"},{status:400})
        }
        // hash password
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //create user
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
        message:"User created successfully",
        status:201,
        success: true,
        savedUser
    })
        

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}

