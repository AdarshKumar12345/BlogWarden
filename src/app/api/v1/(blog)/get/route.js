import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(){
   try {
       const post = await prisma.post.findMany()
       console.log(post , "posts")
       return NextResponse.json(post , {status:200})
   }catch(error){
       console.log("error", error);
       return NextResponse.json({error: "Internal Server Error"}, {status: 500})
   }
}