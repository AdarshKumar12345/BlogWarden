"use client"
import { SessionProvider } from "next-auth/react";

export default function AuthProciders ({children}){
   return ( <SessionProvider>
        {children}
    </SessionProvider>
   )
}