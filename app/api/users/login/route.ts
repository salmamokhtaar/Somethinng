"use client"
import {connect} from '@/dbConfig/dbConfig'
import Link from "next/link";
import React,{useEffect,useState} from 'react';
import {useRouter} from "next/navigation";
import axios from 'axios'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import {toast} from 'react-hot-toast'
import { NextResponse ,NextRequest} from "next/server";
import bcryptjs from 'bcryptjs'

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();

        const {email,password} = reqBody;

        console.log(reqBody);
        // check if user exist
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }
        // create token
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email,
            // role:user.role
        }
        //  create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECTRET! ,{expiresIn: "1d"})
        

        const response = NextResponse.json({
            message:"User logged in successfully",
            success:true,
        })

        response.cookies.set("token",token, {
            httpOnly:true,
            path:"/"
        })
        return response;


    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})

    }
}

