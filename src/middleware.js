import { NextResponse } from "next/server";
import { rateLimit } from "./utils/rateLimit";


export async function middleware(request){

    const allowedOrigins = [ `${process.env.NEXT_PUBLIC_BASE_URL}`, `${process.env.NEXT_PUBLIC_ANALYTICS_URL}`, 'http://localhost:3000'   ];

    if(request.method === 'POST'){

        const origin = request.headers.get('origin');

        if(!allowedOrigins.includes(origin)){
            return NextResponse.json({ message: "Unauthorized"}, { status: 403 })
        }

        let ip = request.ip || request.headers.get("x-forwarded-for") || 'unknown';

        const { limit, remaining, reset } = await rateLimit.limit(ip);
        if( remaining === 0){
            return NextResponse.json({ message: "You have reached limit"}, { status: 429 })
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: '/api/v1/:path'
}