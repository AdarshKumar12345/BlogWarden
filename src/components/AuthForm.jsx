
"use client";
import {Icons} from "@/components/icons"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";


export default function AuthForm({origin}) {
    const [loading , setloading] = useState(false)
    const  onSignIn = async ()=>{
        try{
            setloading(true);
            await signIn('google');


        }catch(error){
            console.error("error" , error.message) ;
             toast("Filed to Sign in ", {
               
               description: "try Again After Some Time",
               action: {
                 label: "Undo",
                 onClick: () => console.log("Undo"),
          }
        })
        }finally{
            setloading(false)
        }
    }
  
      return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900/10 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        {origin==="signIn" ? <h1 className="text-3xl font-bold mb-2 text-center">Sign In to BlogWarden</h1> : <h1 className="text-3xl font-bold mb-2 text-center">Sign Up for BlogWarden</h1>}
        <p className="text-sm text-gray-400 text-center mb-6">Access your account using Google</p>
        {origin==="signIn" ? <button
          onClick={() =>{onSignIn()}}
          className="flex items-center justify-center gap-3 w-full bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          <Icons.GoogleIcon/>
          Sign in with Google
        </button>:<button
          onClick={() =>{onSignIn()}}
          className="flex items-center justify-center gap-3 w-full bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          <Icons.GoogleIcon/>
          Sign Up with Google
        </button>}
        {origin==="signUp" && <div className="mt-6 text-center text-sm text-gray-400">
          <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign In</a></p>
          <p className="mt-2">By signing in, you agree to our <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.</p>
        </div>}
      </div>
    </div>
  );
}


