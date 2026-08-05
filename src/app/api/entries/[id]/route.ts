import { deleteEntry } from '@/lib/db';
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