"use client"
import { useParams } from 'next/navigation';

export default function UserProfile(){
    const params = useParams();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>User Profile</h1>
            <hr/>
            <p className="p-2 ml-2  rounded bg-orange-300 "> Profile page
                 <span>{params.id}</span> </p>
        </div>

    )
}