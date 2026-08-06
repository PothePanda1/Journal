import { deleteEntry, updateEntry } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// making the delete function, after this I will need to make the GUI/a button to delete ids
export async function DELETE(
    request: NextRequest,
    {params} : {params : Promise<{id: string}>}
    ) {
    const {id} = await params;
    const entryId = Number(id);
    if (isNaN(entryId)){
        return NextResponse.json({ error: "Invalid Entry ID" }, { status: 400 })
    } 
    try{
    await deleteEntry(entryId);
    return NextResponse.json({ deleted: entryId }, { status: 200 })}
    catch(error){
         return NextResponse.json({ error: "Server Failure" }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    {params} : {params : Promise<{id: string}>}
){
    const{id} = await params;
    const entryId = Number(id);
    // checking if id is a number/valid input
    if (isNaN(entryId)){
        return NextResponse.json({ error: "Invalid Entry ID" }, { status: 400 })
    }

    // Parse JSON 
    let body;
    // try catch to check
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!body.content || body.content.trim() === "") {
        return NextResponse.json({ error: "Content required" }, { status: 400 });
    }
    try {
        // Updates entry with id and parsed body
        await updateEntry(body.content,entryId);
        return NextResponse.json({ received: body.content }, { status: 200 });
    }
    catch (error) {
        // Handles cases where table isn't found, file is unreachable, connection is dropped, etc.
        return NextResponse.json({ error: "Server Failure" }, { status: 500 });
    }
}