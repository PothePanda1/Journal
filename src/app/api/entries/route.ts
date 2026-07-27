// This file is used to make any request (GET, POST, DELETE, etc.)
// This is the entries route (api/entries)
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
    
    // Parse the incoming JSON body
    try{
    const body = await request.json();
    console.log(body);
    return NextResponse.json({received: body}, {status: 200});
    }

    catch(error){
        // Handles cases where JSON is empty or malformed
    return NextResponse.json({error:"Invalid JSON"}, { status: 400});
    }
}
