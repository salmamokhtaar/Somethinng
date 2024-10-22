"use client"
import Link from "next/link";
import React,{useEffect,useState} from 'react';
import {useRouter} from "next/navigation";
import axios from 'axios'
export default function LoginPage() {
    const router = useRouter();

    // waxa rabtid in aad ka qabatid userka 
    const [user,setUser] = React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled]= React.useState(false);
    const [loading,setLoading] = React.useState(false);





    // database function la xariiro
    const onLogin = async ()=>{
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login",user);
            console.log("Login Success", response.data)
            router.push("/profile")
       
        }
        catch (error :any ){
            console.log("Login failed", error.message)

        }finally{
            setLoading(false)
        }


    }


    useEffect(()=>{
        if(user.email.length > 0  && user.password.length > 0  )
             {
                setButtonDisabled(false)  
            } else {
                setButtonDisabled(true)
            }
    
    
        },[user])


    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold mb-3">{loading ? "Processing" : "Login"} </h1>
        <hr/>
       
        <label htmlFor="">Email </label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
         id="email" type="text" placeholder="email" onChange={(e)=>setUser({...user,email:e.target.value})}/>
        
        <label htmlFor="">Password </label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
         id="password" type="text" placeholder="password" onChange={(e)=>setUser({...user,email:e.target.value})}/>

        <button  onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here </button>
        
        <Link href="/singup">Visit Signup page here</Link>
    </div>
    )
}