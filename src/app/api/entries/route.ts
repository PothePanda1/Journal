// This file is used to make any request (GET, POST, DELETE, etc.)
// This is the entries route (api/entries)
import { NextRequest, NextResponse } from 'next/server';
import { createEntry } from "../../../lib/db";
// implement createEntries in code

export async function POST(request: NextRequest){
    
    // Parse the incoming JSON body
    try{
    const body = await request.json();
    console.log(body.content);
    await createEntry(body.content);
    return NextResponse.json({received: body.content}, {status: 201});
    }

    catch(error){
        // Handles cases where JSON is empty or malformed
    return NextResponse.json({error:"Invalid JSON"}, { status: 400});
    }
}
