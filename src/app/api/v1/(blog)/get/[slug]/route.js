import { prisma } from "@/lib/prisma"; 
import { NextResponse } from "next/server";

export async function GET(request , context) {
    const {slug} = await context.params;
    if (!slug) {
        return NextResponse.json({message: "Slug is required"}, {status: 400});
    }
    try {
        const post = await prisma.post.findUnique({
            where:{
                slug : slug,
                status: "PUBLISHED"
            },
            include:{
                author:{
                    select:{
                        name: true,
                        image: true
                    }
                }
            }
        })
        if( !post){
            return NextResponse.json({message: "Post not found"}, {status: 404})
        }
        return NextResponse.json(post, {status: 200});
    }catch( error){
        console.log("error", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}