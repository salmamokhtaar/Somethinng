"use client"

import Link from "next/link";
import React,{useEffect,useState} from 'react';
import {useRouter} from "next/navigation";
import axios from 'axios'
import {toast} from 'react-hot-toast'
export default function SignupPage() {
    // waxa rabtid in aad ka qabatid userka 
    const router = useRouter();

    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",    
    })
    // button oo 
    const [buttonDisabled,setButtonDisabled]= React.useState(false);

    const [loading,setLoading] = React.useState(false);


    // database function la xariiro
    const onSingup = async ()=>{
        try {
            setLoading(true)
      const response = await axios.post("/api/users/signup",user);
      console.log("Signup Success", response.data)
      router.push("/login")
            
        } catch (error:any) {
            console.log("Signup failed", error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }


    // filds mala so galiyay
    useEffect(()=>{
    if(user.email.length > 0  && user.password.length > 0 
         && user.username.length > 0 )
         {
            setButtonDisabled(false)  
        } else {
            setButtonDisabled(true)
        }


    },[user])

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold mb-3">
            {loading ? "processing" : "Signup"} 
            </h1>
        <hr/>
        <label htmlFor="">Username </label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
         id="name" type="text"  onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="name"/>
        <label htmlFor="">Email </label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
         id="email" type="text" onChange={(e)=>setUser({...user,email:e.target.value})}  placeholder="email"/>
        
        <label htmlFor="">Password </label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
         id="password" type="text" onChange={(e)=>setUser({...user,password:e.target.value})}  placeholder="password"/>

        <button onClick={onSingup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
            {buttonDisabled ? "No Signup" : "Singup"}
        </button>
        
        <Link href="/login">Visit login page here</Link>
    </div>
    )
}